import { statSync, readdirSync, type Stats, unlinkSync } from 'node:fs';

const REMAINING_DUMPS_COUNT = 2;

export async function cleanupDumpDirectory(dir: string): Promise<void> {
  const dirStat = statSync(dir);

  if (!dirStat.isDirectory()) {
    throw new Error(`${dir} is not a directory`);
  }

  const dirMap: [string, Stats][] = [];
  const dirItems = readdirSync(dir).filter((item) => item.endsWith('.sql'));

  if (dirItems.length <= REMAINING_DUMPS_COUNT) {
    console.debug(`Not enough dumps to cleanup directory`);
    return;
  }

  for (const item of dirItems) {
    const itemStat = statSync(item);

    if (!itemStat.isFile()) {
      continue;
    }

    dirMap.push([item, itemStat]);
  }

  dirMap.sort((a, b) => b[1].birthtimeMs - a[1].birthtimeMs);

  dirMap.slice(REMAINING_DUMPS_COUNT).forEach((item) => {
    console.debug(`delete ${item[0]}`);
    unlinkSync(item[0]);
  });
}
