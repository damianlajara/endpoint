import { urlFetch } from './fetch';

describe('fetch utils', () => {
  it('should call fetch with the correct URL and default options', async () => {
    const mockResponse = Response.json({ data: 'test' });

    vi.mocked(global.fetch).mockResolvedValue(mockResponse);

    await urlFetch('/test-endpoint');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/test-endpoint',
      {
        method: 'GET',
        headers: {
          'X-Api-Key': 'test-api-key',
          'Content-Type': 'application/json',
        },
      },
    );
  });

  it('should add a leading slash to the URL if missing', async () => {
    const mockResponse = Response.json({ data: 'test' });

    vi.mocked(global.fetch).mockResolvedValue(mockResponse);

    await urlFetch('test-endpoint');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/test-endpoint',
      expect.any(Object),
    );
  });

  it('should use custom method, body, and headers if provided', async () => {
    const mockResponse = Response.json({ data: 'test' });

    vi.mocked(global.fetch).mockResolvedValue(mockResponse);

    const body = { key: 'value' };
    const customHeaders = { 'Custom-Header': 'test-value' };

    await urlFetch('/test-endpoint', {
      method: 'POST',
      body,
      headers: customHeaders,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/test-endpoint',
      {
        method: 'POST',
        headers: {
          'X-Api-Key': 'test-api-key',
          'Content-Type': 'application/json',
          'Custom-Header': 'test-value',
        },
        body: JSON.stringify(body),
      },
    );
  });

  it('should throw an error if API key is not set', async () => {
    const originalApiKey = process.env.NEXT_PUBLIC_API_KEY;
    vi.stubEnv('NEXT_PUBLIC_API_KEY', '');

    await expect(urlFetch('/test-endpoint')).rejects.toThrow(
      'NEXT_PUBLIC_API_KEY is not set',
    );

    vi.stubEnv('NEXT_PUBLIC_API_KEY', originalApiKey || 'test-api-key');
  });

  it('should throw an error if fetch response is not ok', async () => {
    const mockResponse = Response.error();
    vi.mocked(global.fetch).mockResolvedValue(mockResponse);

    await expect(urlFetch('/test-endpoint')).rejects.toThrow(
      'Error: API error fetching /test-endpoint',
    );
  });

  it('should return the parsed JSON response on success', async () => {
    const responseData = { success: true, data: 'test-data' };
    const mockResponse = Response.json(responseData);

    vi.mocked(global.fetch).mockResolvedValue(mockResponse);

    const result = await urlFetch('/test-endpoint');

    expect(result).toEqual(responseData);
  });
});
