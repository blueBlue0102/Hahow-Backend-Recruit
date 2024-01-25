import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '@root/utils/logger/logger.service';

/**
 * 處理 request 途中發生的任何未預期錯誤
 */
@Catch()
export class UnexceptionalErrorFilter implements ExceptionFilter<Error> {
  constructor(private loggerService: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    this.loggerService.error(exception.stack);

    return response.status(500).json({
      path: request.url,
      statusCode: 500,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
