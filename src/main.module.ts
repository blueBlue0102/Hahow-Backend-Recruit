import { Module } from '@nestjs/common';
import { UtilsModule } from './utils/utils.module';
import { BusinessLogicModule } from './business-logic/business-logic.module';

@Module({
  imports: [UtilsModule, BusinessLogicModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
