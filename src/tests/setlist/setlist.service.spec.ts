import { HttpService, HttpException } from '@nestjs/common';
import { SetlistService } from  '../../setlist/setlist.service';
import { ConfigService } from '../../config/config.service';
import { SetlistRepository } from '../../setlist/setlist.repository';
import Setlist from '../../setlist/setlist.model';

jest.mock('../../config/config.service', () => jest.fn())


const config = require('../../config/config.service')

describe('Setlist Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    it('test should call setlists the same number of times as the total pages', async () => {
        jest.mock('../../setlist/setlist.repository', () => {
            return {
                fetchPages: jest.fn(() => 1),
                fetchSetlists: jest.fn(() => {})
            }
        });
        const repository = require('../../setlist/setlist.repository');
        const fetchPages = jest.spyOn(repository, 'fetchPages').mockImplementation(() => 2);
        const fetchSetlists = jest.spyOn(repository, 'fetchSetlists').mockImplementation(() => [
            {
                id: 1,
                eventDate: 1,
                artist: {},
                venue: {}
            }
        ]);
        const setlist = new SetlistService(config, repository);
        const result = await setlist.findAll("MOCK_ID");

        expect(fetchPages).toHaveBeenCalled();
        expect(fetchSetlists).toHaveBeenCalledTimes(2);
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(Setlist);
    });

    it('test should not call fetchSetlists if pages 0', async () => {
        jest.mock('../../setlist/setlist.repository', () => {
            return {
                fetchPages: jest.fn(() => 1),
                fetchSetlists: jest.fn(() => {})
            }
        });
        const repository = require('../../setlist/setlist.repository');
        const fetchPages = jest.spyOn(repository, 'fetchPages').mockImplementation(() => 0);
        const fetchSetlists = jest.spyOn(repository, 'fetchSetlists').mockImplementation(() => [
            {
                id: 1,
                eventDate: 1,
                artist: {},
                venue: {}
            }
        ]);
        const setlist = new SetlistService(config, repository);
        const result = await setlist.findAll("MOCK_ID");

        expect(fetchPages).toHaveBeenCalled();
        expect(fetchSetlists).not.toHaveBeenCalled();
    });

    it('should return http error on catch', async () => {
        jest.mock('../../setlist/setlist.repository', () => {
            return {
                fetchPages: jest.fn(() => 1),
                fetchSetlists: jest.fn(() => {})
            }
        });
        const repository = require('../../setlist/setlist.repository');
        const fetchPages = jest.spyOn(repository, 'fetchPages').mockImplementation(() => 1);
        const fetchSetlists = jest.spyOn(repository, 'fetchSetlists').mockImplementation(() => {
            throw new Error();
        });
        const setlist = new SetlistService(config, repository);
        await expect(setlist.findAll("MOCK_ID")).rejects.toEqual(new Error('unknown_user'))
    });
});