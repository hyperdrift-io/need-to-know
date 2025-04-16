import { describe, expect, test, spyOn } from 'bun:test';
import { render, screen, fireEvent, within } from '@testing-library/react';
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
    const { container } = render(<NewsCard news={mockNewsItem} />);

    expect(screen.getByText('Test News Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test news summary with important information.')).toBeInTheDocument();
  });

  test('renders trending badge when isTrending is true', () => {
    const { container } = render(<NewsCard news={mockNewsItem} />);

    expect(screen.getByText('Trending #1')).toBeInTheDocument();
  });

  test('does not render trending badge when isTrending is false', () => {
    const nonTrendingNews = { ...mockNewsItem, isTrending: false };
    const { container } = render(<NewsCard news={nonTrendingNews} />);

    expect(screen.queryByText('Trending #1')).not.toBeInTheDocument();
  });

  test('displays formatted date and source', () => {
    const { container } = render(<NewsCard news={mockNewsItem} />);

    // Find text that includes both the date and source
    const dateSourceText = screen.getByText((content) => {
      return content.includes('May 10') && content.includes('Test Source');
    });
    expect(dateSourceText).toBeInTheDocument();
  });

  test('calls onSave when save button is clicked with premium', () => {
    const onSaveMock = spyOn({}, 'onSave');

    const { container } = render(
      <NewsCard
        news={mockNewsItem}
        isPremium={true}
        onSave={() => onSaveMock('123')}
      />
    );

    // Use container query to find the first save button
    const saveButtons = screen.getAllByText('Save');
    fireEvent.click(saveButtons[0]);

    expect(onSaveMock).toHaveBeenCalledWith('123');
  });

  test('renders impact score correctly', () => {
    const { container } = render(<NewsCard news={mockNewsItem} isPremium={true} />);

    // Get all elements with text '8' and make sure at least one exists
    const scoreElements = screen.getAllByText('8');
    expect(scoreElements.length).toBeGreaterThan(0);

    expect(screen.getByText('Impact')).toBeInTheDocument();
  });

  test('renders Pro button for premium features when user is not premium', () => {
    const { container } = render(<NewsCard news={mockNewsItem} isPremium={false} />);

    const proButtons = screen.getAllByText('Pro');
    expect(proButtons.length).toBeGreaterThan(0);
  });

  test('does not render Pro buttons when user is premium', () => {
    const { container } = render(<NewsCard news={mockNewsItem} isPremium={true} />);

    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
  });
});
