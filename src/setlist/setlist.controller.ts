import { Controller, Get, Param, UseInterceptors, CacheInterceptor, Query } from '@nestjs/common';
import { SetlistService } from './setlist.service';

@Controller('setlists')
@UseInterceptors(CacheInterceptor)
export class SetlistController {
  constructor(private readonly setlistService: SetlistService) {}

  @Get(':id')
  findAll(@Param() params, @Query() query) {
    const setlists = this.setlistService.findAll(params.id);
    if (query?.warmer) {
      return 'Cache updated';
    }

    return setlists;
  }
}
