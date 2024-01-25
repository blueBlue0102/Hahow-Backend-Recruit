import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { HeroesController } from './heroes.controller';
import { HeroesService } from '@root/business-logic/heroes/heroes.service';

describe('HeroesController', () => {
  let controller: HeroesController;
  let heroesService: HeroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroesController],
    })
      .useMocker(() => {
        return createMock();
      })
      .compile();

    controller = module.get<HeroesController>(HeroesController);
    heroesService = module.get<HeroesService>(HeroesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getListHeroes', () => {
    it('should call getListHeroesWithProfile() when the request header contains name and password', async () => {
      const getListHeroesWithProfileSpy = jest.spyOn(heroesService, 'getListHeroesWithProfile');

      await controller.getListHeroes('name', 'password');

      expect(getListHeroesWithProfileSpy).toHaveBeenCalledTimes(1);
    });

    it('should call getListHeroes() when the request header does not contains name and password', async () => {
      const getListHeroesSpy = jest.spyOn(heroesService, 'getListHeroes');

      await controller.getListHeroes();

      expect(getListHeroesSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSingleHero', () => {
    it('should call getSingleHeroWithProfile() when the request header contains name and password', async () => {
      const getSingleHeroWithProfileSpy = jest.spyOn(heroesService, 'getSingleHeroWithProfile');

      await controller.getSingleHero('id', 'name', 'password');

      expect(getSingleHeroWithProfileSpy).toHaveBeenCalledTimes(1);
    });

    it('should call getSingleHero() when the request header does not contains name and password', async () => {
      const getSingleHeroSpy = jest.spyOn(heroesService, 'getSingleHero');

      await controller.getSingleHero('id');

      expect(getSingleHeroSpy).toHaveBeenCalledTimes(1);
    });
  });
});
