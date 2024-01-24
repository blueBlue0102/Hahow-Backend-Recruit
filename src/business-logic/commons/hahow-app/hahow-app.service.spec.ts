import { Test, TestingModule } from '@nestjs/testing';
import { HahowAppService } from './hahow-app.service';
import { HttpService } from '@root/utils/http/http.service';
import { HttpModule } from '@root/utils/http/http.module';

describe('HahowAppService', () => {
  let service: HahowAppService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [HahowAppService],
    }).compile();

    service = module.get<HahowAppService>(HahowAppService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getListHeroes', () => {
    it('should return http response data', async () => {
      const mockHttpResponse: Partial<Awaited<ReturnType<HttpService['get']>>> = {
        data: [
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
        ],
      };
      jest.spyOn(httpService, 'get').mockResolvedValue(mockHttpResponse as Awaited<ReturnType<HttpService['get']>>);

      const result = await service.getListHeroes();

      expect(result).toEqual(mockHttpResponse.data);
    });
  });

  describe('getSingleHero', () => {
    it('should return http response data', async () => {
      const mockHttpResponse: Partial<Awaited<ReturnType<HttpService['get']>>> = {
        data: {
          id: '1',
          name: 'Daredevil',
          image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
        },
      };
      jest.spyOn(httpService, 'get').mockResolvedValue(mockHttpResponse as Awaited<ReturnType<HttpService['get']>>);

      const result = await service.getSingleHero('1');

      expect(result).toEqual(mockHttpResponse.data);
    });
  });

  describe('getProfileOfHero', () => {
    it('should return http response data', async () => {
      const mockHttpResponse: Partial<Awaited<ReturnType<HttpService['get']>>> = {
        data: {
          str: 2,
          int: 7,
          agi: 9,
          luk: 7,
        },
      };
      jest.spyOn(httpService, 'get').mockResolvedValue(mockHttpResponse as Awaited<ReturnType<HttpService['get']>>);

      const result = await service.getProfileOfHero('1');

      expect(result).toEqual(mockHttpResponse.data);
    });
  });

  describe('authenticate', () => {
    it('should return true when http response status is 200', async () => {
      const mockHttpResponse: Partial<Awaited<ReturnType<HttpService['post']>>> = {
        status: 200,
      };
      jest.spyOn(httpService, 'post').mockResolvedValue(mockHttpResponse as Awaited<ReturnType<HttpService['post']>>);

      const result = await service.authenticate({ name: 'test', password: 'test' });

      expect(result).toStrictEqual(true);
    });

    it('should return false when http response status is NOT 200', async () => {
      const mockHttpResponse: Partial<Awaited<ReturnType<HttpService['post']>>> = {
        status: 401,
      };
      jest.spyOn(httpService, 'post').mockResolvedValue(mockHttpResponse as Awaited<ReturnType<HttpService['post']>>);

      const result = await service.authenticate({ name: 'test', password: 'test' });

      expect(result).toStrictEqual(false);
    });

    it('should return false when authenticate failure', async () => {
      jest.spyOn(httpService, 'post').mockImplementation(() => {
        throw new Error();
      });

      const result = await service.authenticate({ name: 'test', password: 'test' });

      expect(result).toStrictEqual(false);
    });
  });
});
