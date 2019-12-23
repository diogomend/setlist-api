import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, CacheModule } from '@nestjs/common';
import { SetlistController } from '../../setlist/setlist.controller';
import { ConfigModule } from '../../config/config.module';
import { SetlistService } from  '../../setlist/setlist.service';
import { SetlistRepository } from '../../setlist/setlist.repository';

describe('Setlist Controller', () => {
  let setlistController;
  let setlistService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule, 
        HttpModule,
        CacheModule.register({
          ttl: 3600
        })],
      controllers: [SetlistController],
      providers: [SetlistService, SetlistRepository],
    })
    .compile();

    setlistService = app.get<SetlistService>(SetlistService);
    setlistController = app.get<SetlistController>(SetlistController);
    
  });

  describe('SetlistController', () => {
    it('Expect service to be called', () => {
      jest.spyOn(setlistService, 'findAll').mockImplementation(() => 'MOCK_RESULT');

      expect(setlistController.findAll(1)).toBe('MOCK_RESULT');
    });
  });
});
