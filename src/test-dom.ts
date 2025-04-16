import { DOMEnvironment } from 'happy-dom';

// Create a test environment with a DOM for React component testing
export function setupTestEnvironment() {
  // Create a new DOM environment
  const env = new DOMEnvironment();

  // Set up globals that React Testing Library expects
  global.document = env.window.document;
  global.window = env.window;
  global.navigator = env.window.navigator;

  // Add other necessary browser APIs
  global.Element = env.window.Element;
  global.HTMLElement = env.window.HTMLElement;
  global.HTMLDivElement = env.window.HTMLDivElement;
  global.Node = env.window.Node;
  global.Text = env.window.Text;

  // Add event listener methods
  global.addEventListener = env.window.addEventListener.bind(env.window);
  global.removeEventListener = env.window.removeEventListener.bind(env.window);
  global.dispatchEvent = env.window.dispatchEvent.bind(env.window);

  return env;
}

// Setup the environment automatically when this module is imported
setupTestEnvironment();
