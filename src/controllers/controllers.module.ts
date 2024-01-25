import { Module } from '@nestjs/common';
import { HeroesController } from './heroes/heroes.controller';
import { BusinessLogicModule } from '@root/business-logic/business-logic.module';

/**
 * 定義所有的 API \
 * 負責接收 request 和回傳 response \
 * 負責外部輸入的 validation
 */
@Module({
  imports: [BusinessLogicModule],
  controllers: [HeroesController],
})
export class ControllersModule {}
