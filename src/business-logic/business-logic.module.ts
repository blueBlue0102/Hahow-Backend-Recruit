import { Module } from '@nestjs/common';
import { HahowAppService } from './commons/hahow-app/hahow-app.service';
import { HeroesService } from './heroes/heroes.service';
import { UtilsModule } from '@root/utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [HahowAppService, HeroesService],
  exports: [HeroesService],
})
export class BusinessLogicModule {}
