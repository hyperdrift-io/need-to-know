/// <reference lib="dom" />

import { describe, expect, test, spyOn, mock } from 'bun:test';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopicSelector from '../TopicSelector';

// Mock the Select component behavior
mock('@/components/ui/Select', () => {
  return {
    default: ({ options, onChange }) => (
      <div data-testid="select-mock">
        {options?.map(option => (
          <button
            key={option.value}
            data-value={option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    )
  };
});

const mockTopics = [
  { value: 'ai', label: 'AI' },
  { value: 'tech', label: 'Tech' },
  { value: 'business', label: 'Business' }
];

describe('TopicSelector', () => {
  test.skip('renders the topic selector with the correct title', () => {
    render(
      <TopicSelector
        selectedTopic="crypto"
        onTopicChange={() => {}}
      />
    );

    expect(screen.getByText('Find what matters')).toBeInTheDocument();
  });

  test.skip('displays the selected topic', () => {
    render(
      <TopicSelector
        selectedTopic="crypto"
        onTopicChange={() => {}}
      />
    );

    expect(screen.getByText('Selected: crypto')).toBeInTheDocument();
  });

  test.skip('calls onTopicChange when a topic is selected', () => {
    const mockObj = { onTopicChange: (topic) => {} };
    const spy = spyOn(mockObj, 'onTopicChange');

    render(
      <TopicSelector
        selectedTopic="crypto"
        onTopicChange={(topic) => mockObj.onTopicChange(topic)}
      />
    );

    // Click the select to trigger change
    fireEvent.click(screen.getByTestId('select'));

    expect(spy).toHaveBeenCalledWith('ai');
  });

  test.skip('renders upgrade message for non-premium users', () => {
    render(
      <TopicSelector
        selectedTopic="crypto"
        onTopicChange={() => {}}
        isPremium={false}
      />
    );

    const upgradeElements = screen.getAllByText('Upgrade to Pro');
    expect(upgradeElements.length).toBeGreaterThan(0);

    const accessText = screen.getAllByText(/to access more topics/);
    expect(accessText.length).toBeGreaterThan(0);
  });

  test.skip('does not render upgrade message for premium users', () => {
    render(
      <TopicSelector
        selectedTopic="crypto"
        onTopicChange={() => {}}
        isPremium={true}
      />
    );

    expect(screen.queryByText('Upgrade to Pro')).not.toBeInTheDocument();
  });

  test.skip('renders search button', () => {
    render(
      <TopicSelector
        selectedTopic="crypto"
        onTopicChange={() => {}}
      />
    );

    const searchButtons = screen.getAllByText('Search');
    expect(searchButtons.length).toBeGreaterThan(0);
  });

  test.skip('renders all topics', () => {
    render(<TopicSelector topics={mockTopics} onTopicChange={() => {}} />);

    const selectElement = screen.getByTestId('select-mock');

    expect(within(selectElement).getByText('AI')).toBeInTheDocument();
    expect(within(selectElement).getByText('Tech')).toBeInTheDocument();
    expect(within(selectElement).getByText('Business')).toBeInTheDocument();
  });

  test.skip('calls onTopicChange when a topic is selected with the mock component', () => {
    const mockObj = { onTopicChange: (topic) => {} };
    const spy = spyOn(mockObj, 'onTopicChange');

    render(<TopicSelector topics={mockTopics} onTopicChange={(topic) => mockObj.onTopicChange(topic)} />);

    const selectElement = screen.getByTestId('select-mock');
    const techButton = within(selectElement).getByText('Tech');

    fireEvent.click(techButton);

    expect(spy).toHaveBeenCalledWith('tech');
  });
});
