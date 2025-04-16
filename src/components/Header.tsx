import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from './ui/avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <Link href="/" className="flex items-center">
        <div className="flex items-center gap-2">
          <div className="bg-[var(--color-primary)] w-8 h-8 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">N2</span>
          </div>
          <h1 className="text-xl font-bold">NeedToKnow</h1>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <button className="relative text-white hover:text-[var(--color-primary)] transition-colors">
          <FontAwesomeIcon icon={faBell} size="lg" />
          <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <Link href="/profile">
          <Avatar className="cursor-pointer">
            <AvatarFallback className="bg-[var(--color-primary)] text-white">
              U
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
