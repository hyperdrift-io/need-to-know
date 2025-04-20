import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faShareNodes, faChartLine, faLock, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/DropdownMenu';
import { Button } from './ui/Button';
import Link from 'next/link';

// Premium metrics related to industry impacts
export interface PremiumMetric {
  type: string;
  name: string;
  value: string;
  score: number; // 0-100
  description: string;
  supportingLinks: string[];
}

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  impactScore: number; // 1-10
  date: string;
  isTrending?: boolean;
  source?: string;
  premiumMetrics?: PremiumMetric[];
};

type NewsCardProps = {
  news: NewsItem;
  isPremium?: boolean;
  onSave?: (id: string) => void;
  onShare?: (id: string) => void;
};

export default function NewsCard({
  news,
  isPremium = false,
  onSave,
  onShare
}: NewsCardProps) {
  const { id, title, summary, impactScore, date, isTrending, source, premiumMetrics = [] } = news;
  const [showPremiumMetrics, setShowPremiumMetrics] = useState(false);

  // Format a short date (e.g., "Jun 15")
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  // Helper to format score as a percentage string
  const formatScorePercentage = (score: number) => `${score}%`;

  // Helper to determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card className="bg-[var(--color-bg-card)] border-none mb-4 overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex-1">
          {isTrending && (
            <div className="trending-badge mb-2 inline-block">Trending #1</div>
          )}
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <div className="text-xs text-[var(--color-text-secondary)] mt-1">
            {formattedDate} {source && `• ${source}`}
          </div>
        </div>

        <div className={`impact-score w-10 h-10 ml-2 relative ${!isPremium ? 'premium-blur' : ''}`}>
          {!isPremium && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-[var(--color-bg-card)] bg-opacity-80 cursor-pointer">
              <Button size="sm" className="bg-[var(--color-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary-hover)] text-xs py-1 px-2">
                Pro
              </Button>
            </div>
          )}
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-sm">{impactScore}</span>
            <span className="text-xs">Impact</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-2">
        <p className="text-sm text-[var(--color-text-primary)]">{summary}</p>

        {/* Premium Metrics Section */}
        {premiumMetrics && premiumMetrics.length > 0 && (
          <div className="mt-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowPremiumMetrics(!showPremiumMetrics)}
            >
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={isPremium ? faChartLine : faLock}
                  className={isPremium ? "text-[var(--color-primary)]" : "text-[var(--color-text-secondary)]"}
                />
                <h4 className="font-medium text-sm">In-depth Analysis</h4>
              </div>
              <FontAwesomeIcon
                icon={showPremiumMetrics ? faChevronUp : faChevronDown}
                className="text-[var(--color-text-secondary)]"
              />
            </div>

            {showPremiumMetrics && (
              <div className={`mt-3 ${!isPremium ? 'relative' : ''}`}>
                {/* Blur overlay for non-premium users */}
                {!isPremium && (
                  <div className="absolute inset-0 bg-[var(--color-bg-card)] bg-opacity-90 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4 text-center">
                    <FontAwesomeIcon icon={faLock} className="text-2xl text-[var(--color-primary)] mb-2" />
                    <p className="text-sm mb-3">Access in-depth analysis to understand how it affects the market</p>
                    <Link href="/login">
                      <Button className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]">
                        Login to Access
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Premium metrics display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {premiumMetrics.map((metric, index) => (
                    <div key={`${id}-metric-${index}`} className="border border-gray-800 rounded-md p-3 text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="font-medium">{metric.name}</h5>
                        <span className={`font-bold ${getScoreColor(metric.score)}`}>
                          {formatScorePercentage(metric.score)}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)] mb-2">{metric.description}</p>
                      {metric.supportingLinks && metric.supportingLinks.length > 0 && (
                        <div className="text-xs">
                          {metric.supportingLinks.map((link, i) => (
                            <a
                              key={`${id}-link-${index}-${i}`}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block truncate text-[var(--color-primary)] hover:underline"
                            >
                              {link.replace(/^https?:\/\//, '').split('/')[0]}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <div className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1">
          <FontAwesomeIcon icon={faChartLine} />
          <span>Relevance: High</span>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSave?.(id)}
              className={`text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] ${!isPremium ? 'premium-blur' : ''}`}
            >
              <FontAwesomeIcon icon={faBookmark} className="mr-1" />
              Save
            </Button>

            {!isPremium && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-[var(--color-bg-card)] bg-opacity-80 cursor-pointer">
                <Button size="sm" className="bg-[var(--color-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary-hover)] text-xs py-1 px-2">
                  Pro
                </Button>
              </div>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
                <FontAwesomeIcon icon={faShareNodes} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[var(--color-bg-card)] border-none text-[var(--color-text-primary)]">
              <DropdownMenuItem onClick={() => onShare?.(id)}>
                Share
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
