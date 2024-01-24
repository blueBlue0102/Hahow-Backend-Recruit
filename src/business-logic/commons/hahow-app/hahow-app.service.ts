import { Injectable } from '@nestjs/common';
import { HttpService } from '@root/utils/http/http.service';
import * as Dtos from './dto';

/**
 * 負責串接 Hahow App 的 Service
 */
@Injectable()
export class HahowAppService {
  constructor(private httpService: HttpService) {}

  private readonly APP_DOMAIN_BASE = 'https://hahow-recruit.herokuapp.com';

  /**
   * 取得 Heroes 陣列
   */
  async getListHeroes(): Promise<Dtos.GetListHeroesResBodyDto[]> {
    const url = `${this.APP_DOMAIN_BASE}/heroes`;
    const httpResponse = await this.httpService.get<Dtos.GetListHeroesResBodyDto[]>(url);
    return httpResponse.data;
  }

  /**
   * 取得特定 Hero 資訊
   * @param id Hero ID
   */
  async getSingleHero(id: string): Promise<Dtos.GetSingleHeroResBodyDto> {
    const url = `${this.APP_DOMAIN_BASE}/heroes/${id}`;
    const httpResponse = await this.httpService.get<Dtos.GetSingleHeroResBodyDto>(url);
    return httpResponse.data;
  }

  /**
   * 取得特定 Hero 的 Profile
   * @param id Hero ID
   */
  async getProfileOfHero(id: string): Promise<Dtos.GetProfileOfHeroResBodyDto> {
    const url = `${this.APP_DOMAIN_BASE}/heroes/${id}/profile`;
    const httpResponse = await this.httpService.get<Dtos.GetProfileOfHeroResBodyDto>(url);
    return httpResponse.data;
  }

  /**
   * Authenticate 特定的 name 及 password
   * @param data name 和 password
   */
  async authenticate(data: Dtos.AuthenticateReqBodyDto): Promise<boolean> {
    const url = `${this.APP_DOMAIN_BASE}/auth`;
    try {
      const httpResponse = await this.httpService.post(url, data);
      return httpResponse.status === 200;
    } catch (error) {
      // TODO: log
      return false;
    }
  }
}
