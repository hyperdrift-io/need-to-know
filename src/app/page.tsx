'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicSelector from '@/components/TopicSelector';
import NewsCard from '@/components/NewsCard';
import { newsByTopic } from '@/data/mockNews';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState('crypto');
  const [isPremium] = useState(false); // In a real app, this would come from authentication

  const newsItems = newsByTopic[selectedTopic] || [];

  const handleSave = () => {
    if (!isPremium) {
      toast.error('Upgrade to Pro to save articles', {
        action: {
          label: 'Upgrade',
          onClick: () => window.location.href = '/pricing',
        },
      });
      return;
    }

    toast.success('Article saved successfully');
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    toast.success('Sharing link copied to clipboard');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">NeedToKnow</h1>
          <p className="text-[var(--color-text-secondary)]">Start informed. Stay ahead.</p>
        </section>

        <TopicSelector
          selectedTopic={selectedTopic}
          onTopicChange={setSelectedTopic}
          isPremium={isPremium}
        />

        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Today&apos;s Essential Updates</h2>
            <div className="text-xs text-[var(--color-text-secondary)]">
              Last updated: {new Date().toLocaleTimeString()} •
              <button className="ml-1 text-[var(--color-primary)]">Refresh</button>
            </div>
          </div>

          {newsItems.map((newsItem) => (
            <NewsCard
              key={newsItem.id}
              news={newsItem}
              isPremium={isPremium}
              onSave={handleSave}
              onShare={handleShare}
            />
          ))}

          <div className="text-center mt-8">
            <Button variant="outline" className="text-[var(--color-text-secondary)] border-neutral-800 hover:bg-[var(--color-bg-card)] hover:text-[var(--color-text-primary)]">
              View More Updates
            </Button>
          </div>
        </section>

        <section className="bg-[var(--color-bg-card)] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            <span className="text-[var(--color-primary)]">Pro</span> Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-neutral-800 rounded-lg">
              <h3 className="font-bold mb-1">Unlimited Topics</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Follow all the topics that matter to you</p>
            </div>
            <div className="p-4 border border-neutral-800 rounded-lg">
              <h3 className="font-bold mb-1">Impact Scoring</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Understand the significance of each update</p>
            </div>
            <div className="p-4 border border-neutral-800 rounded-lg">
              <h3 className="font-bold mb-1">Save & Export</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Build your knowledge vault with useful insights</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Button className="bg-[var(--color-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary-hover)]">
              Upgrade to Pro
            </Button>
          </div>
        </section>
      </main>

      <button
        className="fixed bottom-6 right-6 bg-[var(--color-bg-card)] p-3 rounded-full shadow-lg hover:bg-[var(--color-bg-hover)] transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>

      <Footer />
    </div>
  );
}
