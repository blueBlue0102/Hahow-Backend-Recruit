import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig, AxiosResponse, Method, isAxiosError } from 'axios';
import { HttpService as BuiltInHttpService } from '@nestjs/axios';

interface HttpRequestConfig extends AxiosRequestConfig {}
interface HttpResponse<ResBody> extends AxiosResponse<ResBody> {}

@Injectable()
export class HttpService {
  constructor(private readonly builtInHttpService: BuiltInHttpService) {}

  private async request<ResBody = any>(
    url: string,
    method: Method,
    config?: HttpRequestConfig,
  ): Promise<AxiosResponse<ResBody>> {
    try {
      return await firstValueFrom(this.builtInHttpService.request<ResBody>({ url: url, method: method, ...config }));
    } catch (error) {
      if (isAxiosError(error) && error.response != null) {
        throw new HttpException(error.response.data, error.response.status);
      } else throw error;
    }
  }

  async get<ResBody = any>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<ResBody>> {
    return this.request<ResBody>(url, 'GET', config);
  }

  async post<ResBody = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<ResBody>> {
    return this.request<ResBody>(url, 'POST', { data: data, ...config });
  }

  async put<ResBody = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<ResBody>> {
    return this.request<ResBody>(url, 'PUT', { data: data, ...config });
  }

  async patch<ResBody = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<ResBody>> {
    return this.request<ResBody>(url, 'PATCH', { data: data, ...config });
  }

  async delete<ResBody = any>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<ResBody>> {
    return this.request<ResBody>(url, 'DELETE', config);
  }
}
