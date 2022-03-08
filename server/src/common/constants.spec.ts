import { CALLBACK_QUERY_COMMANDS } from './constants';

describe('Test constants', () => {
  test('No duplicate callback query commands', () => {
    const set = new Set(Object.values(CALLBACK_QUERY_COMMANDS));
    expect(set.size).toBe(Object.keys(CALLBACK_QUERY_COMMANDS).length);
  });
});
