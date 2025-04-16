import { describe, expect, test, spyOn } from 'bun:test';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsCard from '../NewsCard';

describe('NewsCard', () => {
  const mockNewsItem = {
    id: '123',
    title: 'Test News Title',
    summary: 'This is a test news summary with important information.',
    impactScore: 8,
    date: '2024-05-10T12:00:00Z',
    isTrending: true,
    source: 'Test Source'
  };

  test('renders news card with correct title and summary', () => {
    render(<NewsCard news={mockNewsItem} />);

    expect(screen.getByText('Test News Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test news summary with important information.')).toBeInTheDocument();
  });

  test('renders trending badge when isTrending is true', () => {
    render(<NewsCard news={mockNewsItem} />);

    expect(screen.getByText('Trending #1')).toBeInTheDocument();
  });

  test('does not render trending badge when isTrending is false', () => {
    const nonTrendingNews = { ...mockNewsItem, isTrending: false };
    render(<NewsCard news={nonTrendingNews} />);

    expect(screen.queryByText('Trending #1')).not.toBeInTheDocument();
  });

  test('displays formatted date and source', () => {
    render(<NewsCard news={mockNewsItem} />);

    // Format of May 10 • Test Source
    const dateElement = screen.getByText(/May 10/);
    expect(dateElement).toBeInTheDocument();
    expect(dateElement.textContent).toContain('Test Source');
  });

  test('calls onSave when save button is clicked with premium', () => {
    const onSaveMock = spyOn({}, 'onSave');

    render(
      <NewsCard
        news={mockNewsItem}
        isPremium={true}
        onSave={() => onSaveMock('123')}
      />
    );

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(onSaveMock).toHaveBeenCalledWith('123');
  });

  test('renders impact score correctly', () => {
    render(<NewsCard news={mockNewsItem} isPremium={true} />);

    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('Impact')).toBeInTheDocument();
  });

  test('renders Pro button for premium features when user is not premium', () => {
    render(<NewsCard news={mockNewsItem} isPremium={false} />);

    const proButtons = screen.getAllByText('Pro');
    expect(proButtons.length).toBeGreaterThan(0);
  });

  test('does not render Pro buttons when user is premium', () => {
    render(<NewsCard news={mockNewsItem} isPremium={true} />);

    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
  });
});
