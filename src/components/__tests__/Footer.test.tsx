import { describe, expect, test, mock } from 'bun:test';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';

// Mock next/link component
import Link from 'next/link';

mock.module('next/link', () => {
  return {
    default: ({ children, href }: { children: React.ReactNode; href: string }) => {
      return <a href={href}>{children}</a>;
    }
  };
});

describe('Footer', () => {
  test('renders logo and tagline', () => {
    render(<Footer />);

    expect(screen.getByText('N2')).toBeInTheDocument();
    expect(screen.getByText('NeedToKnow')).toBeInTheDocument();
    expect(screen.getByText('Start informed. Stay ahead.')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Footer />);

    const aboutLink = screen.getByText('About');
    const whyLink = screen.getByText('Why?');
    const pricingLink = screen.getByText('Pricing');
    const contactLink = screen.getByText('Contact');

    expect(aboutLink).toBeInTheDocument();
    expect(whyLink).toBeInTheDocument();
    expect(pricingLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();

    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
    expect(whyLink.closest('a')).toHaveAttribute('href', '/why');
    expect(pricingLink.closest('a')).toHaveAttribute('href', '/pricing');
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
  });

  test('renders the current year in the copyright text', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear().toString();
    const copyrightText = screen.getByText(new RegExp(`© ${currentYear} NeedToKnow`));

    expect(copyrightText).toBeInTheDocument();
  });
});
