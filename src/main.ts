import { NestFactory } from '@nestjs/core';
import { SetlistModule } from './setlist/setlist.module';

async function bootstrap() {
  const app = await NestFactory.create(SetlistModule);
  app.enableCors();
  console.log(process.env.PORT);
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
