import path from 'node:path';

import fs from 'fs-extra';

import { generateDevs } from './data/devs.data';
import { squads } from './data/squads.data';

export const createMockDb = async () => {
  console.info('Creating mock db ...');

  const dbDirectory = path.join(__dirname, '..', 'data', 'json');
  await fs.ensureDir(dbDirectory);
  const filepath = path.join(dbDirectory, 'db.json');
  const devs = generateDevs();
  const data = { devs, squads };

  await fs.writeJson(filepath, data);
  console.info('Mock DB created.\n');
};
