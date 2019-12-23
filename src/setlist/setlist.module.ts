import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { SetlistController } from './setlist.controller';
import { SetlistService } from './setlist.service';
import { ConfigModule } from '../config/config.module';
import { SetlistRepository } from './setlist.repository';

@Module({
  imports: [
    ConfigModule, 
    HttpModule,
    CacheModule.register({
      ttl: 3600
    })],
  controllers: [SetlistController],
  providers: [SetlistService, SetlistRepository],
})
export class SetlistModule {}
