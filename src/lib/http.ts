type RequestOptions = RequestInit & {
  baseUrl?: string | undefined;
};

class HttpError extends Error {
  constructor(payload: any) {
    super(payload?.message);
  }
}

class SessionToken {
  private token = "";
  get value() {
    return this.token;
  }

  set value(token: string) {
    if (typeof window === undefined)
      throw new Error("Cannot set token  on server side");
    this.token = token;
  }
}

export const sessionToken = new SessionToken();

const request = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  options?: RequestOptions | undefined
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  console.log("http", sessionToken.value);

  const baseHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: sessionToken.value ? `Bearer ${sessionToken.value}` : "",
  };

  const baseUrl =
    options?.baseUrl === undefined
      ? process.env.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    method,
    body,
  });

  const payload: T = await res.json();
  if (!res.ok) throw new HttpError(payload);

  return payload;
};

const http = {
  get<T>(url: string, options?: Omit<RequestOptions, "body"> | undefined) {
    return request<T>(url, "GET", options);
  },

  post<T>(
    url: string,
    body: any,
    options?: Omit<RequestOptions, "body"> | undefined
  ) {
    return request<T>(url, "POST", { ...options, body });
  },

  put<T>(
    url: string,
    body: any,
    options?: Omit<RequestOptions, "body"> | undefined
  ) {
    return request<T>(url, "PUT", { ...options, body });
  },

  delete(
    url: string,
    body: any,
    options?: Omit<RequestOptions, "body"> | undefined
  ) {
    return request(url, "DELETE", { ...options, body });
  },
};

export default http;
