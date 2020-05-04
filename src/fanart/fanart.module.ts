import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { FanartController } from './fanart.controller';
import { FanartService } from './fanart.service';
import { ConfigModule } from '../config/config.module';
import { FanartRepository } from './fanart.repository';

@Module({
  imports: [
    ConfigModule, 
    HttpModule,
    CacheModule.register({
      ttl: 3600
    })],
  controllers: [FanartController],
  providers: [FanartService, FanartRepository],
})
export class FanartModule {}
