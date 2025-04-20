'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicSelector from '@/components/TopicSelector';
import NewsCard from '@/components/NewsCard';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { NewsItem } from '@/components/NewsCard';
import { authService } from '@/lib/supabase';

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState('crypto');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication status when component mounts
    const checkAuthStatus = async () => {
      const loggedIn = authService.isLoggedIn();
      const premium = authService.isPremium();

      setIsLoggedIn(loggedIn);
      setIsPremium(premium);
    };

    checkAuthStatus();

    // Fetch news for the selected topic
    fetchNewsForTopic(selectedTopic);
  }, [selectedTopic]);

  // Helper function for development - toggle mock login status
  const toggleMockLogin = () => {
    if (isLoggedIn) {
      authService.signOut();
      setIsLoggedIn(false);
      setIsPremium(false);
      toast.success('Logged out successfully');
    } else {
      authService.mockLogin(true); // Set to true for premium
      setIsLoggedIn(true);
      setIsPremium(true);
      toast.success('Logged in as premium user');
    }
  };

  const fetchNewsForTopic = async (topic: string, refetch = false) => {
    setIsLoading(true);
    try {
      const url = new URL('/api/news', window.location.origin);
      url.searchParams.append('topic', topic);
      if (refetch) {
        url.searchParams.append('refetch', 'true');
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      setNewsItems(data.articles || []);
      setLastUpdated(data.lastUpdated);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error('Failed to load news. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchNewsForTopic(selectedTopic, true);
    toast.success('Refreshing news data...');
  };

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

  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Never';
    const date = new Date(lastUpdated);
    return date.toLocaleTimeString();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">NeedToKnow</h1>
          <p className="text-[var(--color-text-secondary)]">Start informed. Stay ahead.</p>

          {/* Development toggle for login status - only visible in development */}
          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={toggleMockLogin}
              className="text-xs bg-[var(--color-primary)] text-white px-2 py-1 rounded mt-2"
            >
              {isLoggedIn ? 'Mock Logout' : 'Mock Login (Premium)'}
            </button>
          )}
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
              Last updated: {formatLastUpdated()} •
              <button
                className="ml-1 text-[var(--color-primary)]"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <p>Loading news...</p>
            </div>
          ) : newsItems.length === 0 ? (
            <div className="text-center py-10">
              <p>No news available for this topic. Try another topic or refresh.</p>
            </div>
          ) : (
            newsItems.map((newsItem) => (
              <NewsCard
                key={newsItem.id}
                news={newsItem}
                isPremium={isPremium}
                onSave={handleSave}
                onShare={handleShare}
              />
            ))
          )}

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
