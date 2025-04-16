import { describe, expect, test, spyOn, mock } from 'bun:test';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TopicSelector from '../TopicSelector';

// Mock the Select component behavior
mock.module('./ui/Select', () => {
  return {
    Select: ({ children, value, onValueChange }) => (
      <div data-testid="select" onClick={() => onValueChange('ai')}>
        Selected: {value}
        {children}
      </div>
    ),
    SelectContent: ({ children }) => <div data-testid="select-content">{children}</div>,
    SelectItem: ({ children, value }) => (
      <div data-testid={`select-item-${value}`}>{children}</div>
    ),
    SelectTrigger: ({ children }) => <div data-testid="select-trigger">{children}</div>,
    SelectValue: ({ placeholder }) => <div data-testid="select-value">{placeholder}</div>,
  };
});

describe('TopicSelector', () => {
  test('renders the topic selector with the correct title', () => {
    render(
      <TopicSelector
        selectedTopic="crypto"
        onTopicChange={() => {}}
      />
    );

    expect(screen.getByText('Find what matters')).toBeInTheDocument();
  });

  test('displays the selected topic', () => {
    render(
      <TopicSelector
        selectedTopic="crypto"
        onTopicChange={() => {}}
      />
    );

    expect(screen.getByText('Selected: crypto')).toBeInTheDocument();
  });

  test('calls onTopicChange when a topic is selected', () => {
    const onTopicChangeMock = spyOn({}, 'onTopicChange');

    render(
      <TopicSelector
        selectedTopic="crypto"
        onTopicChange={(topic) => onTopicChangeMock(topic)}
      />
    );

    // Click the select to trigger change
    fireEvent.click(screen.getByTestId('select'));

    expect(onTopicChangeMock).toHaveBeenCalledWith('ai');
  });

  test('renders upgrade message for non-premium users', () => {
    render(
      <TopicSelector
        selectedTopic="crypto"
        onTopicChange={() => {}}
        isPremium={false}
      />
    );

    expect(screen.getByText('Upgrade to Pro')).toBeInTheDocument();
    expect(screen.getByText(/to access more topics/)).toBeInTheDocument();
  });

  test('does not render upgrade message for premium users', () => {
    render(
      <TopicSelector
        selectedTopic="crypto"
        onTopicChange={() => {}}
        isPremium={true}
      />
    );

    expect(screen.queryByText('Upgrade to Pro')).not.toBeInTheDocument();
  });

  test('renders search button', () => {
    render(
      <TopicSelector
        selectedTopic="crypto"
        onTopicChange={() => {}}
      />
    );

    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
