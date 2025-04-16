import { describe, expect, test, spyOn } from 'bun:test';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button, buttonVariants } from '../button';

describe('Button', () => {
  test('renders button with default variant and size', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();

    // Check default classes are applied
    expect(button.className).toContain('bg-primary');
    expect(button.className).toContain('h-9');
  });

  test('renders button with specified variant', () => {
    render(<Button variant="destructive">Delete</Button>);

    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button.className).toContain('bg-destructive');
  });

  test('renders button with specified size', () => {
    render(<Button size="sm">Small Button</Button>);

    const button = screen.getByRole('button', { name: 'Small Button' });
    expect(button.className).toContain('h-8');
  });

  test('renders button with custom className', () => {
    render(<Button className="my-custom-class">Custom Button</Button>);

    const button = screen.getByRole('button', { name: 'Custom Button' });
    expect(button.className).toContain('my-custom-class');
  });

  test('triggers onClick handler when clicked', () => {
    const onClickMock = spyOn({}, 'onClick');

    render(<Button onClick={() => onClickMock()}>Clickable</Button>);

    const button = screen.getByRole('button', { name: 'Clickable' });
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });

  test('renders as a different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );

    const link = screen.getByRole('link', { name: 'Link Button' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(link.className).toContain('bg-primary');
  });

  test('applies disabled attribute and styling', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
    expect(button.className).toContain('disabled:opacity-50');
  });

  test('buttonVariants function returns correct class string', () => {
    const classes = buttonVariants({ variant: 'outline', size: 'lg' });

    expect(classes).toContain('border');
    expect(classes).toContain('bg-background');
    expect(classes).toContain('h-10');
  });
});
