import axios, { AxiosResponse, Method } from "axios";

export interface IRequester {
  host: string;
}

export abstract class Requester {
  readonly host: string;
  private authToken: string | null = null;

  constructor({ host }: IRequester) {
    this.host = host;
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  clearAuthToken(): void {
    this.authToken = null;
  }

  makeUrl(url: string): string {
    return `${this.host}${url}`;
  }

  private async rawFetcher<T = any>(
    url: string,
    method: Method,
    data?: any
  ): Promise<AxiosResponse<T>> {
    try {
      const result = await axios({
        method,
        url,
        data,
        params: method === "GET" ? data : undefined,
        headers: url.startsWith(process.env.NEXT_PUBLIC_API_HOST ?? "")
          ? this.getApiHeaders()
          : undefined,
      });

      return result;
    } catch (err) {
      throw err;
    }
  }

  private getApiHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    headers["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`;

    return headers;
  }

  async fetcher<T = any>(url: string, method: Method, data?: any): Promise<T> {
    try {
      const result = await this.rawFetcher(url, method, data);
      return result.data;
    } catch (err) {
      throw err;
    }
  }
}
