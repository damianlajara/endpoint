type FetchOptions<TBody> = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: TBody;
  headers?: Record<string, string>;
};

export async function urlFetch<TResponse, TBody = Record<string, unknown>>(
  url: string,
  fetchOptions: FetchOptions<TBody> = {},
): Promise<TResponse> {
  const { method = 'GET', body, headers = {} } = fetchOptions;

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_API_KEY is not set');
  }
  const cleanedUrl = url.startsWith('/') ? url : `/${url}`;
  const res = await fetch(
    `https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io${cleanedUrl}`,
    {
      method,
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
        ...headers,
      },
      ...(body && { body: JSON.stringify(body) }),
    },
  );

  if (!res.ok) {
    throw new Error(`Error: API error fetching ${cleanedUrl}`);
  }

  return res.json() as Promise<TResponse>;
}
