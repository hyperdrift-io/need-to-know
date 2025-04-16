import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faShareNodes, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  impactScore: number; // 1-10
  date: string;
  isTrending?: boolean;
  source?: string;
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
  const { id, title, summary, impactScore, date, isTrending, source } = news;

  // Format a short date (e.g., "Jun 15")
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="bg-[#1A1A1A] border-none mb-4 overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex-1">
          {isTrending && (
            <div className="trending-badge mb-2 inline-block">Trending #1</div>
          )}
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <div className="text-xs text-[#A1A1A1] mt-1">
            {formattedDate} {source && `• ${source}`}
          </div>
        </div>

        <div className={`impact-score w-10 h-10 ml-2 relative ${!isPremium ? 'premium-blur' : ''}`}>
          {!isPremium && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-[#1A1A1A] bg-opacity-80 cursor-pointer">
              <Button size="sm" className="bg-[#8438FF] text-[#FFFFFF] hover:bg-[#7530e3] text-xs py-1 px-2">
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
        <p className="text-sm text-[#FFFFFF]">{summary}</p>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <div className="text-xs text-[#A1A1A1] flex items-center gap-1">
          <FontAwesomeIcon icon={faChartLine} />
          <span>Relevance: High</span>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSave?.(id)}
              className={`text-[#A1A1A1] hover:text-[#8438FF] ${!isPremium ? 'premium-blur' : ''}`}
            >
              <FontAwesomeIcon icon={faBookmark} className="mr-1" />
              Save
            </Button>

            {!isPremium && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-[#1A1A1A] bg-opacity-80 cursor-pointer">
                <Button size="sm" className="bg-[#8438FF] text-[#FFFFFF] hover:bg-[#7530e3] text-xs py-1 px-2">
                  Pro
                </Button>
              </div>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-[#A1A1A1] hover:text-[#8438FF]">
                <FontAwesomeIcon icon={faShareNodes} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1A1A1A] border-none text-[#FFFFFF]">
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
