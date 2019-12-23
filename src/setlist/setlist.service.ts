import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import Setlist from './setlist.model';
import { SetlistRepository } from './setlist.repository';

@Injectable()
export class SetlistService {
  constructor(private readonly config: ConfigService, private readonly repo: SetlistRepository) {}
  async findAll(id): Promise<Setlist[]> {
    try {
        let result = [];
        let page = 0;
        const totalPages = await this.repo.fetchPages(id);
        while (page ++ < totalPages) {
            const setlists = await this.repo.fetchSetlists(id, page);
            const setlistsCollection = setlists.map(setlist => {
                return new Setlist(
                    setlist.id,
                    setlist.eventDate,
                    setlist.artist,
                    setlist.venue
                );
            })
            result = [...result, ...setlistsCollection];
        }
       return result;
    } catch (err) {
       throw new HttpException("unknown_user", 404);
    }
  }
}
