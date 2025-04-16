import { describe, expect, test } from 'bun:test';
import { cn } from '../utils';

describe('utils', () => {
  describe('cn', () => {
    test('should merge class names correctly', () => {
      const result = cn('text-red-500', 'bg-blue-500', { 'p-4': true, 'hidden': false });
      expect(result).toBe('text-red-500 bg-blue-500 p-4');
    });

    test('should handle conditional classes', () => {
      const isPrimary = true;
      const result = cn('btn', {
        'btn-primary': isPrimary,
        'btn-secondary': !isPrimary,
      });
      expect(result).toBe('btn btn-primary');
    });

    test('should handle array of classes', () => {
      const result = cn(['flex', 'items-center'], 'gap-2');
      expect(result).toBe('flex items-center gap-2');
    });
  });
});
