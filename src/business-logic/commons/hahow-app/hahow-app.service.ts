import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@root/utils/http/http.service';
import * as Dtos from './dto';
import { objectTypeValidator } from '@root/helpers';

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
    try {
      httpResponse.data.forEach((data) => objectTypeValidator(Dtos.GetListHeroesResBodyDto, data));
    } catch (error) {
      throw new InternalServerErrorException(`無法正確取得 hero 資訊: ${error.message}`);
    }
    return httpResponse.data;
  }

  /**
   * 取得特定 Hero 資訊
   * @param id Hero ID
   */
  async getSingleHero(id: string): Promise<Dtos.GetSingleHeroResBodyDto> {
    const url = `${this.APP_DOMAIN_BASE}/heroes/${id}`;
    const httpResponse = await this.httpService.get<Dtos.GetSingleHeroResBodyDto>(url);
    try {
      objectTypeValidator(Dtos.GetSingleHeroResBodyDto, httpResponse.data);
    } catch (error) {
      throw new InternalServerErrorException(`無法正確取得 hero 資訊: ${error.message}`);
    }
    return httpResponse.data;
  }

  /**
   * 取得特定 Hero 的 Profile
   * @param id Hero ID
   */
  async getProfileOfHero(id: string): Promise<Dtos.GetProfileOfHeroResBodyDto> {
    const url = `${this.APP_DOMAIN_BASE}/heroes/${id}/profile`;
    const httpResponse = await this.httpService.get<Dtos.GetProfileOfHeroResBodyDto>(url);
    try {
      objectTypeValidator(Dtos.GetProfileOfHeroResBodyDto, httpResponse.data);
    } catch (error) {
      throw new InternalServerErrorException(`無法順利取得 profile 資訊: ${error.message}`);
    }
    return httpResponse.data;
  }

  /**
   * Authenticate 特定的 name 及 password
   * status 200 時回傳 true；status 401 時回傳 false；其餘情況 throw exception
   * @param data name 和 password
   */
  async authenticate(data: Dtos.AuthenticateReqBodyDto): Promise<boolean> {
    const url = `${this.APP_DOMAIN_BASE}/auth`;
    const httpResponse = await this.httpService.post(url, data, {
      validateStatus: (status) => {
        return status === 200 || status === 401;
      },
    });
    return httpResponse.status === 200;
  }
}
