import { Module } from '@nestjs/common';
import { HttpModule as BuiltInHttpModule } from '@nestjs/axios';
import { HttpService } from './http.service';

@Module({
  imports: [BuiltInHttpModule],
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
