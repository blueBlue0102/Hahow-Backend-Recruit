import { Module } from '@nestjs/common';
import { HahowAppService } from './commons/hahow-app/hahow-app.service';

@Module({
  providers: [HahowAppService],
})
export class BusinessLogicModule {}
