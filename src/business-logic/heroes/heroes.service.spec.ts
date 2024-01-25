import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { HeroesService } from './heroes.service';
import { HahowAppService } from '@root/business-logic/commons/hahow-app/hahow-app.service';

describe('HeroesService', () => {
  let service: HeroesService;
  let hahowAppService: HahowAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroesService],
    })
      .useMocker(() => {
        return createMock();
      })
      .compile();

    service = module.get<HeroesService>(HeroesService);
    hahowAppService = module.get<HahowAppService>(HahowAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getListHeroesWithProfile', () => {
    it('should return correct value', async () => {
      jest.spyOn(hahowAppService, 'authenticate').mockResolvedValue(true);
      jest.spyOn(hahowAppService, 'getListHeroes').mockResolvedValue([
        {
          id: '1',
          name: 'Daredevil',
          image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
        },
        {
          id: '2',
          name: 'Thor',
          image: 'http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg',
        },
      ]);
      jest.spyOn(hahowAppService, 'getProfileOfHero').mockImplementation(async (id) => {
        switch (id) {
          case '1':
            return {
              str: 2,
              int: 7,
              agi: 9,
              luk: 7,
            };
          case '2':
            return {
              str: 8,
              int: 2,
              agi: 5,
              luk: 9,
            };
          default:
            return {
              str: 0,
              int: 0,
              agi: 0,
              luk: 0,
            };
        }
      });

      const result = await service.getListHeroesWithProfile('name', 'password');

      expect(result).toEqual([
        {
          id: '1',
          name: 'Daredevil',
          image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
          profile: {
            str: 2,
            int: 7,
            agi: 9,
            luk: 7,
          },
        },
        {
          id: '2',
          name: 'Thor',
          image: 'http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg',
          profile: {
            str: 8,
            int: 2,
            agi: 5,
            luk: 9,
          },
        },
      ]);
    });
  });

  describe('getSingleHeroWithProfile', () => {
    it('should return correct value', async () => {
      jest.spyOn(hahowAppService, 'authenticate').mockResolvedValue(true);
      jest.spyOn(hahowAppService, 'getSingleHero').mockResolvedValue({
        id: '1',
        name: 'Daredevil',
        image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
      });
      jest.spyOn(hahowAppService, 'getProfileOfHero').mockImplementation(async (id) => {
        switch (id) {
          case '1':
            return {
              str: 2,
              int: 7,
              agi: 9,
              luk: 7,
            };
          default:
            return {
              str: 0,
              int: 0,
              agi: 0,
              luk: 0,
            };
        }
      });

      const result = await service.getSingleHeroWithProfile('1', 'name', 'password');

      expect(result).toEqual({
        id: '1',
        name: 'Daredevil',
        image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
        profile: {
          str: 2,
          int: 7,
          agi: 9,
          luk: 7,
        },
      });
    });
  });
});
