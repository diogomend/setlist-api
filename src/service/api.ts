import { HttpService, HttpException } from '@nestjs/common';

class Api {
    httpService: HttpService;
    constructor () {
        this.httpService = new HttpService();
    }
    async get(url, headers): Promise<any> {
        return await this.httpService.get(url, {headers}).toPromise();
    }
}

const instance = new Api();
export default instance;