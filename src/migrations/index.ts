import * as migration_20251211_220939 from './20251211_220939';
import * as migration_20251212_071557 from './20251212_071557';

export const migrations = [
  {
    up: migration_20251211_220939.up,
    down: migration_20251211_220939.down,
    name: '20251211_220939',
  },
  {
    up: migration_20251212_071557.up,
    down: migration_20251212_071557.down,
    name: '20251212_071557'
  },
];
