import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HahowAppService } from '@root/business-logic/commons/hahow-app/hahow-app.service';
import * as HeroDtos from '@root/controllers/heroes/dtos';

@Injectable()
export class HeroesService {
  constructor(private hahowAppService: HahowAppService) {}

  /**
   * 進行權限驗證，若不通過則 throw exception
   * @param name name
   * @param password password
   */
  private async authenticate(name: string, password: string): Promise<void> {
    if (await this.hahowAppService.authenticate({ name, password })) return;
    else throw new UnauthorizedException('權限驗證失敗，無法順利取得資訊');
  }

  /**
   * 取得 Hero List
   */
  async getListHeroes(): Promise<HeroDtos.Hero[]> {
    return this.hahowAppService.getListHeroes();
  }

  /**
   * 取得帶有 profile 的 Hero List
   * 若無權限則拋錯誤
   * @param name name
   * @param password password
   */
  async getListHeroesWithProfile(name: string, password: string): Promise<HeroDtos.Hero[]> {
    // 權限驗證
    await this.authenticate(name, password);

    // 組出帶有 profile 的 hero list
    const heroList = await this.hahowAppService.getListHeroes();
    const heroWithProfileList: HeroDtos.Hero[] = [];
    for (const hero of heroList) {
      const profile = await this.hahowAppService.getProfileOfHero(hero.id);
      heroWithProfileList.push({ ...hero, profile });
    }
    return heroWithProfileList;
  }

  /**
   * 取得特定 Hero 資訊
   */
  async getSingleHero(id: string): Promise<HeroDtos.Hero> {
    return this.hahowAppService.getSingleHero(id);
  }

  /**
   * 取得帶有 profile 的 Hero 資訊
   * @param heroId heroId
   * @param name 權限驗證 name
   * @param password 權限驗證 password
   */
  async getSingleHeroWithProfile(heroId: string, name: string, password: string) {
    // 權限驗證
    await this.authenticate(name, password);

    // 組出帶有 profile 的 hero 資訊
    const heroInfo = await this.hahowAppService.getSingleHero(heroId);
    const profile = await this.hahowAppService.getProfileOfHero(heroInfo.id);
    return {
      ...heroInfo,
      profile,
    };
  }
}
