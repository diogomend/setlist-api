import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import Setlist from './setlist.model';
import Api from '../service/api';

@Injectable()
export class SetlistRepository {
    constructor(private readonly config: ConfigService) {}
    async fetchPages(id: Number): Promise<any> {
        const url = this.config.get('SETLIST_URL') + 'user/' + id + '/attended';
        const res = await Api.get(url, {
            'Accept': 'application/json',
            'x-api-key': this.config.get('SETLIST_KEY'),
        });

        const itemsPerPage = res.data.itemsPerPage;
        const totalItems = res.data.total;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        return Promise.resolve(totalPages);
    }
    async fetchSetlists(id, page) {
        const url = this.config.get('SETLIST_URL') + 'user/' + id + '/attended?p=' + page;
        const res = await Api.get(url, {
            'Accept': 'application/json', // afaik this one is not needed
            'x-api-key': this.config.get('SETLIST_KEY'),
        });
        return res.data.setlist;
    }
}