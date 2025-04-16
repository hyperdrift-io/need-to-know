import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Add custom render with providers if needed
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, {
    // wrap provider(s) here if needed
    // e.g., <ThemeProvider>{ui}</ThemeProvider>
    ...options,
  });
}

export * from '@testing-library/react';
export { customRender as render };
