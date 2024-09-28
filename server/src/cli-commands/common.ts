import { type TCLICommand } from './types';

export async function execute(command: TCLICommand): Promise<void> {
  try {
    await command();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
