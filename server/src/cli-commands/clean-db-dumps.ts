import { statSync, readdirSync, unlinkSync, Stats } from 'node:fs';
import { join, extname } from 'node:path';

const DEFAULT_HOW_MANY_TO_KEEP = 2;

export async function cleanDbDumps(
  dir: string,
  howManyToKeep = DEFAULT_HOW_MANY_TO_KEEP,
): Promise<void> {
  const dirStat = statSync(dir);

  if (!dirStat.isDirectory()) {
    throw new Error(`${dir} is not a directory`);
  }

  const dirFiles = readdirSync(dir)
    .filter((fileName) => extname(fileName) === '.sql')
    .map((fileName) => join(dir, fileName));

  const statsMap = new Map<Stats, string>();

  const dirFilesStats = dirFiles.map((dirFile) => {
    const stat = statSync(dirFile);
    statsMap.set(stat, dirFile);
    return stat;
  });

  dirFilesStats.sort((a, b) => b.birthtimeMs - a.birthtimeMs);

  dirFilesStats.slice(howManyToKeep).forEach((stat) => {
    const dirFile = statsMap.get(stat);

    if (!dirFile) {
      throw new Error(`Could not find path for given stat`);
    }

    try {
      unlinkSync(dirFile);
    } catch (error) {
      console.error(error);
    }
  });
}
