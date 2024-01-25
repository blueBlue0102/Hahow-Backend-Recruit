import { Controller, Get, Headers, Param } from '@nestjs/common';
import * as Dtos from './dtos';
import { HeroesService } from '@root/business-logic/heroes/heroes.service';
import { ApiOperation, ApiTags, ApiHeader } from '@nestjs/swagger';

@ApiTags('Heroes')
@Controller('heroes')
export class HeroesController {
  constructor(private heroesService: HeroesService) {}

  @Get()
  @ApiOperation({
    summary: '取得 Hero List',
    description: '當 header 帶有 `name` 和 `password` 並通過驗證時，所回傳資訊額外帶有 `profile` 資訊',
  })
  @ApiHeader({
    name: 'name',
    required: false,
  })
  @ApiHeader({
    name: 'password',
    required: false,
  })
  async getListHeroes(
    @Headers('name') name?: string,
    @Headers('password') password?: string,
  ): Promise<Dtos.GetListHeroesResBodyDto> {
    if (name != null && password != null) {
      const heroes = await this.heroesService.getListHeroesWithProfile(name, password);
      return { heroes };
    } else {
      const heroes = await this.heroesService.getListHeroes();
      return { heroes };
    }
  }

  @Get('/:heroId')
  @ApiOperation({
    summary: '取得特定 Hero 資訊',
    description: '當 header 帶有 `name` 和 `password` 並通過驗證時，所回傳資訊額外帶有 `profile` 資訊',
  })
  @ApiHeader({
    name: 'name',
    required: false,
  })
  @ApiHeader({
    name: 'password',
    required: false,
  })
  async getSingleHero(
    @Param('heroId') heroId: string,
    @Headers('name') name?: string,
    @Headers('password') password?: string,
  ): Promise<Dtos.GetSingleHeroResBodyDto> {
    if (name != null && password != null) {
      const heroInfo = await this.heroesService.getSingleHeroWithProfile(heroId, name, password);
      return heroInfo;
    } else {
      const heroInfo = await this.heroesService.getSingleHero(heroId);
      return heroInfo;
    }
  }
}
