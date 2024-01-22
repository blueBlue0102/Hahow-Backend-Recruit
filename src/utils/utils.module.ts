import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';

/**
 * Utility Library \
 * 顧名思義，是系統的工具程式庫 \
 * 抽象化成介面後，提供給整份專案使用
 */
@Module({
  imports: [HttpModule],
  exports: [HttpModule],
})
export class UtilsModule {}
