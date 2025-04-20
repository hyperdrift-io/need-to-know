'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from './ui/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from './ui/Button';
import { authService } from '@/lib/supabase';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/DropdownMenu';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check auth status when component mounts
    const checkAuth = () => {
      const loggedIn = authService.isLoggedIn();
      const premium = authService.isPremium();
      setIsLoggedIn(loggedIn);
      setIsPremium(premium);
    };

    checkAuth();

    // Add event listener for storage changes (for cross-tab auth sync)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    await authService.signOut();
    setIsLoggedIn(false);
    setIsPremium(false);
    router.push('/');
  };

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
        {isLoggedIn ? (
          <>
        <button className="relative text-white hover:text-[var(--color-primary)] transition-colors">
          <FontAwesomeIcon icon={faBell} size="lg" />
          <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarFallback className="bg-[var(--color-primary)] text-white">
                    {isPremium ? 'P' : 'U'}
            </AvatarFallback>
          </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[var(--color-bg-card)] border-none text-[var(--color-text-primary)]">
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  Settings
                </DropdownMenuItem>
                {!isPremium && (
                  <DropdownMenuItem onClick={() => router.push('/pricing')}>
                    Upgrade to Pro
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost" className="text-[var(--color-text-primary)]">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]">
                Sign up
              </Button>
        </Link>
          </>
        )}
      </div>
    </header>
  );
}
