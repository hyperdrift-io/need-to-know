import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Avatar, AvatarImage, AvatarFallback } from '../Avatar';

describe('Avatar', () => {
  test('renders avatar with image', () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/image.jpg" alt="@user" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );

    const avatarImage = screen.getByAltText('@user');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('renders avatar fallback when image is not provided', () => {
    render(
      <Avatar>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('U')).toBeInTheDocument();
  });

  test('applies custom className to avatar', () => {
    render(
      <Avatar className="custom-avatar">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByText('U').parentElement;
    expect(avatar).toHaveClass('custom-avatar');
  });
});
