/// <reference lib="dom" />

import { describe, expect, test, mock } from 'bun:test';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';

// Mock next/link component
import Link from 'next/link';

mock('next/link', () => {
  return {
    default: ({ children, href }: { children: React.ReactNode; href: string }) => {
      return <a href={href}>{children}</a>;
    }
  };
});

describe('Footer', () => {
  test('renders logo and tagline', () => {
    render(<Footer />);

    // Get the first matching element when there are multiple
    const n2Elements = screen.getAllByText('N2');
    expect(n2Elements.length).toBeGreaterThan(0);
    
    const needToKnowElements = screen.getAllByText('NeedToKnow');
    expect(needToKnowElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText('Start informed. Stay ahead.')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    const { container } = render(<Footer />);

    // Get the first matching link of each type
    const aboutLinks = screen.getAllByText('About');
    const whyLinks = screen.getAllByText('Why?');
    const pricingLinks = screen.getAllByText('Pricing');
    const contactLinks = screen.getAllByText('Contact');

    expect(aboutLinks.length).toBeGreaterThan(0);
    expect(whyLinks.length).toBeGreaterThan(0);
    expect(pricingLinks.length).toBeGreaterThan(0);
    expect(contactLinks.length).toBeGreaterThan(0);

    // Check the href of the first of each link type
    expect(aboutLinks[0].closest('a')).toHaveAttribute('href', '/about');
    expect(whyLinks[0].closest('a')).toHaveAttribute('href', '/why');
    expect(pricingLinks[0].closest('a')).toHaveAttribute('href', '/pricing');
    expect(contactLinks[0].closest('a')).toHaveAttribute('href', '/contact');
  });

  test('renders the current year in the copyright text', () => {
    const { container } = render(<Footer />);

    const currentYear = new Date().getFullYear().toString();
    // Use container query to find text with the year
    const yearElements = Array.from(container.querySelectorAll('p')).filter(
      p => p.textContent?.includes(`© ${currentYear}`)
    );
    
    expect(yearElements.length).toBeGreaterThan(0);
  });
});
