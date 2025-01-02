import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Bookstore Management App API')
    .setDescription(
      'The bookstore API description. Unnecessary routes are hidden.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.API_PORT || 4000;
  console.log(`Application is running on: http://localhost:${port}/api`);
  await app.listen(port);
}
bootstrap();
