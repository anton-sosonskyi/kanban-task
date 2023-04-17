
const token = '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';
const BASE_URL = 'https://api.github.com/repos/';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export function request<T>(
  url: string,
  method: RequestMethod = 'GET',
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${token}`,
    }
  };
  return fetch(BASE_URL + url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error("Unable to load");
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
