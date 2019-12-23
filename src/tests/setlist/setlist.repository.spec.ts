import { SetlistRepository } from '../../setlist/setlist.repository';
import Setlist from '../../setlist/setlist.model';
import Axios from 'axios';
import { Observable } from 'rxjs';
import Api from '../../service/api';

jest.mock('../../config/config.service', () => {
    return {
        get: jest.fn()
    }
});

const config = require('../../config/config.service');

describe('Setlist Repository', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    it('expect fetchPages to return number of pages', async () => {
        const repository = new SetlistRepository(config);
        jest.spyOn(Api, 'get').mockImplementation(() => {
            return Promise.resolve({
                data: {
                    itemsPerPage: 10,
                    total: 50
                }
            });
        });

        expect(await repository.fetchPages(1)).toEqual(5);
    });

    it('expect fetchSetlists to return setlist', async () => {
        const repository = new SetlistRepository(config);
        jest.spyOn(Api, 'get').mockImplementation(() => {
            return Promise.resolve({
                data: {
                    setlist: {id: 1}
                }
            });
        });

        expect(await repository.fetchSetlists(1, 1)).toEqual({id: 1});
    });
});