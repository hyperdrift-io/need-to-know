import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-8 mt-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="bg-[var(--color-primary)] w-6 h-6 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">N2</span>
              </div>
              <h3 className="text-sm font-bold">NeedToKnow</h3>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-2">
              Start informed. Stay ahead.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/about" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
              About
            </Link>
            <Link href="/why" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
              Why?
            </Link>
            <Link href="/pricing" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-[var(--color-text-secondary)]">
          <p className="mt-2">
            © {new Date().getFullYear()} NeedToKnow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
