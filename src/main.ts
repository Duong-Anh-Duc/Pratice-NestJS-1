import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const configService = new ConfigService()
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  await app.listen(configService.get<string>('PORT')?? 3000);
}

bootstrap();
