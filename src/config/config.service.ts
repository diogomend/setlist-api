import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor(filePath: string) {
    if (process.env.NODE_ENV !== 'production') {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath))
    } else {
      this.envConfig = process.env;
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}