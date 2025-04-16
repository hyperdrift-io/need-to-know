import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type TopicSelectorProps = {
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
  isPremium?: boolean;
};

export default function TopicSelector({
  selectedTopic,
  onTopicChange,
  isPremium = false,
}: TopicSelectorProps) {
  const topics = [
    { value: 'crypto', label: 'Crypto' },
    { value: 'defi', label: 'DeFi' },
    { value: 'ai', label: 'AI' },
  ];

  // Additional topics only available for premium users
  const premiumTopics = [
    { value: 'nft', label: 'NFTs' },
    { value: 'web3', label: 'Web3' },
    { value: 'dao', label: 'DAOs' },
  ];

  const allTopics = isPremium
    ? [...topics, ...premiumTopics]
    : topics;

  return (
    <div className="bg-[#1A1A1A] p-4 rounded-lg mb-6">
      <div className="flex items-center gap-2 mb-2">
        <FontAwesomeIcon icon={faSearch} className="text-[#8438FF]" />
        <h2 className="text-lg font-semibold">Find what matters</h2>
      </div>

      <div className="flex gap-2">
        <Select value={selectedTopic} onValueChange={onTopicChange}>
          <SelectTrigger className="bg-[#1A1A1A] border-none text-white">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1A1A] border-none text-white">
            {allTopics.map((topic) => (
              <SelectItem key={topic.value} value={topic.value}>
                {topic.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button className="bg-[#8438FF] text-white hover:bg-[#8438FF]/90">
          Search
        </Button>
      </div>

      {!isPremium && (
        <div className="mt-2 text-xs text-[#A1A1A1]">
          <span className="text-[#8438FF]">Upgrade to Pro</span> to access more topics
        </div>
      )}
    </div>
  );
}
