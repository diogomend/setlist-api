import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import Api from '../service/api';

@Injectable()
export class FanartRepository {
    constructor(private readonly config: ConfigService) {}
    async getArtistMedia(mbid: String): Promise<any> {
        const url = this.config.get('FANART_URL') + mbid + '?api_key=' + this.config.get('FANART_KEY');
        
        return Api.get(url, {});
    }

    async getImageFromURL(url: String): Promise<any> {
        return await Api.getBuffer(url, {});
    }
}