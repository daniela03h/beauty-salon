const defaulUrl =
  "https://beautysalongates-production.up.railway.app/api/v1";

export class HttpClient {
  private baseUrl: string;
  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || defaulUrl;
  }
  private async getHeader() {
    return {
      //si esta autenticado
      "Content-Type": "application/json",
       // "Autorizaiton": "Berarer token"
    };
  }
  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    if(response.status === 204) {
      return true
    }
    return await response.json();
  }
  async get<T>(url: string): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "GET",
      cache: "no-cache"
      // next: {
      //   revalidate: 0
      // }
    });
    return this.handleResponse(response);
  }
  async post<T, B>(url: string, body: B): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }
  async put<T, B>(url: string, body: B): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "PUT",
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }
  async delete<T>(url: string): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "DELETE",
    });
    return this.handleResponse(response);
  }
}