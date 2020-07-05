import { Controller, Get, Param, Header, UseInterceptors, CacheInterceptor, Res, Query } from '@nestjs/common';
import { FanartService } from './fanart.service';

@Controller('fanart')
@UseInterceptors(CacheInterceptor)
export class FanartController {
  constructor(private readonly fanartService: FanartService) {}

  @Get(':mbid')
  async getImage(@Res() res, @Param() params, @Query() query) {
        const preview = query.preview || false;
        const filename = params.mbid.substring(0, params.mbid.lastIndexOf('.')) || params.mbid;

        const { data } = await this.fanartService.getImage(filename, preview);
        
        res.set({'Content-Type': 'image/png'});   
        var expDate = new Date(Date.now()+1000*3600*24*365).toUTCString();
        var lastModified = 'Tue, 07 May 2019 08:43:41 GMT';
        var newHeaders =
        [
          {"Access-Control-Allow-Origin": "*"},
          {"Cache-Control": "public, max-age=0"},
          {"Expires": expDate},
          {"Last-modified": lastModified},
          {"Pragma": "cache"},
          {"Etag": filename},
        ];

        newHeaders.forEach((header) => {
          res.set(header);
        });

        const buffer = Buffer.from(data);
        res.end(buffer);
  }
}
