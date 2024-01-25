import { IsString } from 'class-validator';

export class GetListHeroesResBodyDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  image: string;
}
