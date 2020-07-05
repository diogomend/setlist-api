import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor(filePath: string) {
    this.envConfig = process.env.NODE_ENV !== 'production' ?
      dotenv.parse(fs.readFileSync(filePath)) :
      process.env;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}