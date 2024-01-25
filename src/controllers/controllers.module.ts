import { Module } from '@nestjs/common';
import { HeroesController } from './heroes/heroes.controller';
import { BusinessLogicModule } from '@root/business-logic/business-logic.module';

@Module({
  imports: [BusinessLogicModule],
  controllers: [HeroesController],
})
export class ControllersModule {}
