import { Window } from 'happy-dom';

// Create a test environment with a DOM for React component testing
export function setupTestEnvironment() {
  // Create a new DOM environment
  const window = new Window();
  const document = window.document;

  // Set up globals that React Testing Library expects
  global.document = document;
  global.window = window;
  global.navigator = window.navigator;

  // Add other necessary browser APIs
  global.Element = window.Element;
  global.HTMLElement = window.HTMLElement;
  global.HTMLDivElement = window.HTMLDivElement;
  global.Node = window.Node;
  global.Text = window.Text;

  // Add event listener methods
  global.addEventListener = window.addEventListener.bind(window);
  global.removeEventListener = window.removeEventListener.bind(window);
  global.dispatchEvent = window.dispatchEvent.bind(window);

  return window;
}

// Setup the environment automatically when this module is imported
setupTestEnvironment();
