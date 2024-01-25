import { Module } from '@nestjs/common';
import { UtilsModule } from './utils/utils.module';
import { BusinessLogicModule } from './business-logic/business-logic.module';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [UtilsModule, BusinessLogicModule, ControllersModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
