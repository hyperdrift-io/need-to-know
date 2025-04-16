/// <reference lib="dom" />

import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Avatar, AvatarImage, AvatarFallback } from '../Avatar';

describe('Avatar', () => {
  test('renders avatar with fallback', () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="https://example.com/image.jpg" alt="test-user" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );

    // Check for the fallback text
    const fallbackElements = screen.getAllByText('U');
    expect(fallbackElements.length).toBeGreaterThan(0);
  });

  test('renders avatar fallback when image is not provided', () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );

    const fallbackElements = screen.getAllByText('U');
    expect(fallbackElements.length).toBeGreaterThan(0);
  });

  test('applies custom className to avatar', () => {
    const { container } = render(
      <Avatar className="custom-avatar">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );

    // Check directly in the container for elements with the class
    const avatarElement = container.querySelector('.custom-avatar');
    expect(avatarElement).not.toBeNull();
  });
});
