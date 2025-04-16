import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

// Mock next/link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Header', () => {
  test('renders logo and site name', () => {
    render(<Header />);

    expect(screen.getByText('N2')).toBeInTheDocument();
    expect(screen.getByText('NeedToKnow')).toBeInTheDocument();
  });

  test('renders notification bell with count', () => {
    render(<Header />);

    const notificationCount = screen.getByText('3');
    expect(notificationCount).toBeInTheDocument();
  });

  test('renders user avatar', () => {
    render(<Header />);

    const avatar = screen.getByText('U');
    expect(avatar).toBeInTheDocument();
  });
});
