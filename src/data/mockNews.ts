import { NewsItem } from '../components/NewsCard';

// Crypto news
export const cryptoNews: NewsItem[] = [
  {
    id: 'crypto-1',
    title: 'Bitcoin Successfully Completes Halving, Reward Now 3.125 BTC',
    summary: 'The much-anticipated Bitcoin halving has occurred at block 840,000, reducing mining rewards to 3.125 BTC per block. Market volatility expected in the coming days as the impact of reduced supply issuance plays out.',
    impactScore: 9,
    date: '2024-04-20',
    isTrending: true,
    source: 'Cointelegraph'
  },
  {
    id: 'crypto-2',
    title: 'Ethereum Layer 2 Solutions Reach 1M Daily Active Users',
    summary: 'Ethereum scaling solutions Arbitrum and Optimism collectively passed 1 million daily active users, signaling growing adoption of Layer 2 networks for lower-cost transactions. This marks a 150% increase from six months ago.',
    impactScore: 8,
    date: '2024-04-19',
    source: 'The Block'
  },
  {
    id: 'crypto-3',
    title: 'Major US Exchange Expands Globally, Opens Services in 45 New Markets',
    summary: 'A leading US-based cryptocurrency exchange has announced expansion into 45 new countries, focusing on emerging markets in Asia, Africa, and South America. The move comes after securing regulatory approvals in key jurisdictions.',
    impactScore: 7,
    date: '2024-04-18',
    source: 'CoinDesk'
  },
];

// DeFi news
export const defiNews: NewsItem[] = [
  {
    id: 'defi-1',
    title: 'Aave Launches Version 4 with Major Gas Optimizations',
    summary: 'Aave has launched V4 of its lending protocol with significant gas optimizations, reducing transaction costs by up to 80%. The update also includes enhanced risk parameters and new asset types for collateral.',
    impactScore: 8,
    date: '2024-04-20',
    isTrending: true,
    source: 'DeFi Pulse'
  },
  {
    id: 'defi-2',
    title: 'Uniswap Governance Approves Fee Switch for Selected Pools',
    summary: 'Uniswap DAO has finally approved the implementation of protocol fees for certain liquidity pools. The fee switch will direct 10% of trading fees to the treasury, potentially generating millions in revenue for UNI holders.',
    impactScore: 9,
    date: '2024-04-19',
    source: 'Decrypt'
  },
  {
    id: 'defi-3',
    title: 'Cross-Chain Bridge Activity Hits All-Time High',
    summary: 'Cross-chain bridge activity has reached an all-time high with over $2B in daily volume. The growing interoperability between blockchains is supporting increased TVL across multiple DeFi ecosystems.',
    impactScore: 7,
    date: '2024-04-17',
    source: 'DefiLlama'
  },
];

// AI news
export const aiNews: NewsItem[] = [
  {
    id: 'ai-1',
    title: 'OpenAI Releases GPT-5 with Breakthrough Reasoning Capabilities',
    summary: 'OpenAI has unveiled GPT-5, featuring significant improvements in reasoning, code generation, and factual accuracy. Early tests show the model outperforming human experts in various domains, including mathematics and scientific research.',
    impactScore: 10,
    date: '2024-04-20',
    isTrending: true,
    source: 'TechCrunch'
  },
  {
    id: 'ai-2',
    title: 'EU Finalizes AI Act, Setting Global Standards for AI Regulation',
    summary: 'The European Union has finalized the comprehensive AI Act, establishing a risk-based framework for regulating artificial intelligence. Tech companies now have 18 months to comply with the strictest rules for high-risk AI systems.',
    impactScore: 8,
    date: '2024-04-18',
    source: 'Reuters'
  },
  {
    id: 'ai-3',
    title: 'New AI Training Method Reduces Energy Consumption by 90%',
    summary: 'Researchers have developed a novel approach to training large language models that reduces energy consumption by up to 90% without sacrificing performance. The breakthrough could make AI development more sustainable and accessible.',
    impactScore: 7,
    date: '2024-04-16',
    source: 'MIT Technology Review'
  },
];

// Map topics to their respective news arrays
export const newsByTopic: Record<string, NewsItem[]> = {
  crypto: cryptoNews,
  defi: defiNews,
  ai: aiNews
};
