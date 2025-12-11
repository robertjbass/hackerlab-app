import * as migration_20251211_220939 from './20251211_220939';

export const migrations = [
  {
    up: migration_20251211_220939.up,
    down: migration_20251211_220939.down,
    name: '20251211_220939'
  },
];
