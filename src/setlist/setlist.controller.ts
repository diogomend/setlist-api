import { Controller, Get, Param, HttpException, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { SetlistService } from './setlist.service';

@Controller('setlists')
@UseInterceptors(CacheInterceptor)
export class SetlistController {
  constructor(private readonly setlistService: SetlistService) {}

  @Get(':id')
  findAll(@Param() params) {
    return this.setlistService.findAll(params.id);
  }
}
