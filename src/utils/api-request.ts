type ApiRequestError = {
  errors: string[];
  success: false;
  status: number;
};

type ApiRequestSuccess<T> = {
  data: T;
  success: true;
  status: number;
};

export type ApiRequest<T> = ApiRequestError | ApiRequestSuccess<T>;

export async function apiRequest<T>(
  url: string,
  options?: RequestInit,
): Promise<ApiRequest<T>> {
  try {
    const res = await fetch(url, options);
    const json = await res.json().catch(() => null);

    if (!res.ok) {
      const errors = Array.isArray(json?.message)
        ? json.message
        : [json?.message || 'Erro inesperado'];

      return {
        errors,
        success: false,
        status: res.status,
      };
    }
  } catch (err) {}
}
