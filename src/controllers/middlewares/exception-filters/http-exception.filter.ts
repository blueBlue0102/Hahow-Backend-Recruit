import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '@root/utils/logger/logger.service';

/**
 * 收到 `HttpException` 時，進行 log
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  constructor(private loggerService: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    this.loggerService.error(exception.stack);

    return response
      .status(exception.getStatus())
      .json({
        path: request.url,
        statusCode: exception.getStatus(),
        message: exception.message,
        timestamp: new Date().toISOString(),
      });
  }
}
