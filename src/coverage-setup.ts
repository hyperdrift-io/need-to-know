// This file contains configuration for test coverage reporting
export default {
  // Configure istanbul instrumentation
  instrument: {
    // Files to include in coverage (uses glob patterns)
    include: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.d.ts',
      '!src/**/*.test.{ts,tsx}',
      '!src/**/__tests__/**/*',
      '!src/setup-tests.ts',
      '!src/coverage-setup.ts',
      '!src/test-utils.tsx',
    ],
    // Files to exclude from coverage
    exclude: [
      'node_modules/**',
      '.next/**',
    ],
  },
  // Thresholds for coverage reporting
  thresholds: {
    statements: 70,
    branches: 70,
    functions: 70,
    lines: 70,
  },
};
