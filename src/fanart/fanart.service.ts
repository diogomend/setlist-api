import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { FanartRepository } from './fanart.repository';
import { Readable } from 'stream';
@Injectable()
export class FanartService {
  constructor(private readonly config: ConfigService, private readonly repo: FanartRepository) {}
  async getImage(mbid) {
      try {
        const { data } = await this.repo.getArtistMedia(mbid);
        const imageURL = this.getImageURL(data);

        if (!imageURL) {
          throw new HttpException("media_not_found", 404);
        }
        const url = imageURL.replace(/^https?\:\/\//i, "http://").replace(/\/fanart\//gm, "/preview/");
        return await this.repo.getImageFromURL(url);
      } catch (err) {
        throw new HttpException("media_not_found", 404);
      }
  }

  getImageURL(data) {
    if (data.artistthumb) {
      return data.artistthumb[0].url;
    }

    if(data.albums) {
      const firstAlbum = Object.keys(data.albums)[0];
      const albumcover = data.albums[firstAlbum]['albumcover'];
      return albumcover[0]['url'];
    }

    return false;
  }
}
