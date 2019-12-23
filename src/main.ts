import { NestFactory } from '@nestjs/core';
import { SetlistModule } from './setlist/setlist.module';

async function bootstrap() {
  const app = await NestFactory.create(SetlistModule);
  await app.listen(8000);
}
bootstrap();
