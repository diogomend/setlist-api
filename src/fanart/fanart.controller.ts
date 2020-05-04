import { Controller, Get, Param, Header, UseInterceptors, CacheInterceptor, Res, HttpService } from '@nestjs/common';
import { FanartService } from './fanart.service';
import { Response } from 'express';
const fs = require('fs');

@Controller('fanart')
@UseInterceptors(CacheInterceptor)
export class FanartController {
  constructor(private readonly fanartService: FanartService) {}

  @Get(':mbid')
  async getImage(@Res() res, @Param() params) {
        const { data } = await this.fanartService.getImage(params.mbid);
        const buffer = Buffer.from(data);
        res.set({'Content-Type': 'image/png'});   
        res.set("Cache-Control", "public,max-age=31536000,immutable");
        res.end(buffer);
  }
}
