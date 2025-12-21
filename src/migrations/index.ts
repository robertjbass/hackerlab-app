import * as migration_20251212_084855 from './20251212_084855';
import * as migration_20251221_205825 from './20251221_205825';
import * as migration_20251221_215121 from './20251221_215121';

export const migrations = [
  {
    up: migration_20251212_084855.up,
    down: migration_20251212_084855.down,
    name: '20251212_084855',
  },
  {
    up: migration_20251221_205825.up,
    down: migration_20251221_205825.down,
    name: '20251221_205825',
  },
  {
    up: migration_20251221_215121.up,
    down: migration_20251221_215121.down,
    name: '20251221_215121'
  },
];
