import { statSync, readdirSync, unlinkSync, Stats } from 'node:fs';

const DEFAULT_HOW_MANY_TO_KEEP = 2;

export async function cleanDbDumps(
  dir: string,
  howManyToKeep = DEFAULT_HOW_MANY_TO_KEEP,
): Promise<void> {
  const dirStat = statSync(dir);

  if (!dirStat.isDirectory()) {
    throw new Error(`${dir} is not a directory`);
  }

  const dirContents = readdirSync(dir);

  const statMap = new Map<Stats, string>();

  const dirContentsStats = dirContents.map((dc) => {
    const stat = statSync(dc);
    statMap.set(stat, dc);
    return stat;
  });

  dirContentsStats.sort((a, b) => a.birthtimeMs - b.birthtimeMs);

  dirContentsStats.slice(howManyToKeep).forEach((stat) => {
    const path = statMap.get(stat);

    if (!path) {
      throw new Error(`Could not find path for given stat`);
    }

    unlinkSync(path);
  });
}
