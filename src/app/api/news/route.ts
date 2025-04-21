import { NextResponse } from 'next/server';
import { NewsItem, PremiumMetric } from '@/components/NewsCard';
import Redis from 'ioredis';
import { jsonrepair } from 'jsonrepair';

const redis = new Redis(); // Defaults to localhost:6379

interface NewsArticle {
  title: string;
  summary: string;
  importance?: number;
  published_date?: string;
  source?: string;
  relevance?: number;
  isTrending?: boolean;
  premiumMetrics?: PremiumMetric[];
  meta?: {
    source: string;
    originLink: string;
  };
  [key: string]: unknown;
}

// Approximate shape of the Grok API response after parsing
interface GrokResponseData {
  articles: NewsArticle[];
  [key: string]: unknown;
}

interface NewsSummaryResult {
  topic: string;
  lastUpdated: string;
  articles: NewsItem[];
  articleCount: string;
}

const GROK_API_KEY = process.env.GROK_API_KEY || '';
const GROK_API_URL = 'https://api.x.ai/v1';
const CACHE_EXPIRATION = 24 * 60 * 60; // 24 hours in seconds

export async function GET(request: Request) {
  const url = new URL(request.url);
  const topic = url.searchParams.get('topic');
  const refetch = url.searchParams.get('refetch');
  const articleCount = url.searchParams.get('count') ? parseInt(url.searchParams.get('count')!) : 5;

  if (!topic) {
    return NextResponse.json(
      { error: 'Topic parameter is required' },
      { status: 400 }
    );
  }

  const cacheKey = `news:${topic}:count:${articleCount}`;
  const shouldRefetch = refetch === 'true';

  if (!shouldRefetch) {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log('Returning cached news summary for topic:', topic);
      return NextResponse.json(JSON.parse(cached));
    }
  }

  try {
    const summaryData = await fetchNewsFromGrokAPI(topic, articleCount);
    await redis.set(cacheKey, JSON.stringify(summaryData), 'EX', CACHE_EXPIRATION);
    return NextResponse.json(summaryData);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news summary' },
      { status: 500 }
    );
  }
}

async function fetchNewsFromGrokAPI(topic: string, articleCount: number): Promise<NewsSummaryResult> {
  if (!GROK_API_KEY) {
    throw new Error('Grok API key is not configured');
  }

  const prompt = generateOptimizedPrompt(topic, articleCount);

  const response = await fetch(`${GROK_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROK_API_KEY}`
    },
    body: JSON.stringify({
      model: 'grok-3-beta',
      messages: [
        {
          role: 'system',
          content: 'You are an expert news analyst. Output only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    let errorBody = '';
    try {
      errorBody = await response.text();
    } catch {}
    console.error('Grok API returned error:', response.status, errorBody);
    throw new Error(`Grok API returned error: ${response.status} ${errorBody}`);
  }

  const responseData = await response.json();
  if (!responseData.choices || !responseData.choices[0]?.message?.content) {
    console.error('Unexpected Grok API response:', JSON.stringify(responseData));
    throw new Error('Unexpected Grok API response format');
  }
  let parsedData;
  try {
    parsedData = JSON.parse(responseData.choices[0].message.content);
  } catch {
    try {
      parsedData = JSON.parse(jsonrepair(responseData.choices[0].message.content));
      console.warn('Used jsonrepair to fix Grok API JSON.');
    } catch {
      console.error('Failed to parse Grok API content:', responseData.choices[0].message.content);
      throw new Error('Failed to parse Grok API content as JSON');
    }
  }
  return formatGrokResponse(parsedData, topic, articleCount);
}

function generateOptimizedPrompt(topic: string, articleCount: number): string {
  return `Give the ${articleCount} most important recent news in ${topic} for professionals. For each article, provide: title, summary (1-2 sentences), impactScore (1-10), date, source, meta (source, originLink), image (URL to a relevant article image), and premiumMetrics as an object with keys: MarketRelevance, SecurityImplications, RegulatoryImpact, InnovationScore, AdoptionPotential. Each premiumMetric should have only: score (0-100), note (short string). Respond as compact JSON: { articles: [...] }.`;
}

function formatGrokResponse(data: GrokResponseData, topic: string, articleCount: number): NewsSummaryResult {
  const articles = data.articles || [];
  return {
    topic,
    lastUpdated: new Date().toISOString(),
    articleCount: articles.length > articleCount ? `>${articleCount}` : articles.length.toString(),
    articles: articles.map((article: NewsArticle, index: number) => {
      const meta = (article.meta && typeof article.meta === 'object' ? article.meta : {}) as { source?: string; originLink?: string };
      return {
        id: `${topic}-${index}`,
        title: article.title,
        summary: article.summary,
        impactScore: article.importance || Math.floor(Math.random() * 10) + 1,
        date: article.published_date || new Date().toISOString(),
        isTrending: article.isTrending || index === 0,
        source: meta?.source || article.source || 'Grok AI',
        premiumMetrics: article.premiumMetrics || [],
        meta: {
          source: meta?.source || article.source || 'Grok AI',
          originLink: meta?.originLink || ''
        }
      };
    })
  };
}
