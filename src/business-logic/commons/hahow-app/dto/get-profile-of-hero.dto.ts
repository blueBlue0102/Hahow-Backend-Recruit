import { IsNumber } from 'class-validator';

export class GetProfileOfHeroResBodyDto {
  @IsNumber()
  str: number;
  @IsNumber()
  int: number;
  @IsNumber()
  agi: number;
  @IsNumber()
  luk: number;
}
