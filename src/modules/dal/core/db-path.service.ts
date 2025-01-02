import path from 'node:path';

import { Injectable } from '@nestjs/common';

@Injectable()
export class DbPathService {
  getDbDirectory() {
    return path.join(__dirname, '..', '..', '..', 'data', 'json');
  }

  getDbPath() {
    return path.join(this.getDbDirectory(), 'db.json');
  }
}
