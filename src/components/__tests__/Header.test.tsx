/// <reference lib="dom" />

import { describe, expect, test, mock } from 'bun:test';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

// Mock next/link component
mock('next/link', () => {
  return {
    default: ({ children, href }) => {
      return <a href={href}>{children}</a>;
    }
  };
});

describe('Header', () => {
  test('renders logo and site name', () => {
    render(<Header />);

    const n2Elements = screen.getAllByText('N2');
    expect(n2Elements.length).toBeGreaterThan(0);

    const needToKnowElements = screen.getAllByText('NeedToKnow');
    expect(needToKnowElements.length).toBeGreaterThan(0);
  });

  test('renders notification bell with count', () => {
    render(<Header />);

    // Use getAllByText to handle multiple elements
    const notificationCount = screen.getAllByText('3')[0];
    expect(notificationCount).toBeInTheDocument();
  });

  test('renders user avatar', () => {
    render(<Header />);

    const avatarElements = screen.getAllByText('U');
    expect(avatarElements.length).toBeGreaterThan(0);
  });
});
