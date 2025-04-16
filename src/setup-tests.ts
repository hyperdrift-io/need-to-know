import { expect, beforeEach, afterEach, afterAll } from 'bun:test';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// This file extends Bun's global test setup with Testing Library matchers

// Set up React Testing Library
beforeEach(() => {
  // Any setup before each test
});

afterEach(() => {
  cleanup(); // Clean up after each test
});

afterAll(() => {
  // Any cleanup after all tests
});
