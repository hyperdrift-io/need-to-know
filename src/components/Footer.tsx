import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className="py-8 mt-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="bg-[#8438FF] w-6 h-6 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">N2</span>
              </div>
              <h3 className="text-sm font-bold">NeedToKnow</h3>
            </div>
            <p className="text-xs text-[#A1A1A1] mt-2">
              Start informed. Stay ahead.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/about" className="text-[#A1A1A1] hover:text-[#8438FF] transition-colors">
              About
            </Link>
            <Link href="/why" className="text-[#A1A1A1] hover:text-[#8438FF] transition-colors">
              Why?
            </Link>
            <Link href="/pricing" className="text-[#A1A1A1] hover:text-[#8438FF] transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-[#A1A1A1] hover:text-[#8438FF] transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-[#A1A1A1]">
          <p className="mt-2">
            © {new Date().getFullYear()} NeedToKnow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
