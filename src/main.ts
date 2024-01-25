import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggerService } from '@root/utils/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(LoggerService));

  // Swagger Doc
  const config = new DocumentBuilder()
    .setTitle('Hahow Backend Recruit')
    .setDescription('Hahow Backend Recruit API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}
bootstrap();
