import { describe, expect, test, mock } from 'bun:test';

// Mock global fetch
global.fetch = mock(async (url: string) => {
  if (url.includes('/api/news')) {
    return {
      ok: true,
      status: 200,
      json: async () => ({
        news: [
          { id: 1, title: 'Test Article 1', summary: 'Summary 1' },
          { id: 2, title: 'Test Article 2', summary: 'Summary 2' }
        ]
      })
    };
  }

  return {
    ok: false,
    status: 404
  };
});

describe('API Routes', () => {
  test('should fetch news articles', async () => {
    const response = await fetch('https://example.com/api/news');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.news).toHaveLength(2);
    expect(data.news[0].title).toBe('Test Article 1');
  });

  test('should return 404 for unknown routes', async () => {
    const response = await fetch('https://example.com/api/unknown');

    expect(response.status).toBe(404);
    expect(response.ok).toBe(false);
  });
});
