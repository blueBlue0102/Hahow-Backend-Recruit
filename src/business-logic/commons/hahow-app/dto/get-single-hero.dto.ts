import { IsString } from 'class-validator';

export class GetSingleHeroResBodyDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  image: string;
}
