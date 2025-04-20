import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Button } from './ui/Button';
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
    <div className="bg-[var(--color-bg-card)] p-4 rounded-lg mb-6">
      <div className="flex items-center gap-2 mb-2">
        <FontAwesomeIcon icon={faSearch} className="text-[var(--color-primary)]" />
        <h2 className="text-lg font-semibold">Find what matters</h2>
      </div>

      <div className={`flex gap-2 relative ${!isPremium ? 'premium-blur' : ''}`}>
        <Select value={selectedTopic} onValueChange={onTopicChange}>
          <SelectTrigger className="bg-[var(--color-bg-card)] border-none text-white">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--color-bg-card)] border-none text-white">
            {allTopics.map((topic) => (
              <SelectItem key={topic.value} value={topic.value}>
                {topic.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]">
          Search
        </Button>

        {!isPremium && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-[var(--color-bg-card)] bg-opacity-80 rounded-lg z-10">
            <Button
              size="sm"
              className="bg-[var(--color-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary-hover)]"
              onClick={() => window.location.href = '/login'}
            >
              Login to Use
            </Button>
          </div>
        )}
      </div>

      {!isPremium && (
        <div className="mt-2 text-xs text-[var(--color-text-secondary)]">
          <span className="text-[var(--color-primary)]">Upgrade to Pro</span> to access more topics
        </div>
      )}
    </div>
  );
}
