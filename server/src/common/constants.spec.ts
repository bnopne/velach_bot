import { CALLBACK_QUERY_COMMANDS } from './constants';

describe('Test constants', () => {
  test('No duplicate callback query commands', () => {
    Object.keys(CALLBACK_QUERY_COMMANDS).forEach((key) => {
      Object.keys(CALLBACK_QUERY_COMMANDS)
        .filter((k) => k !== key)
        .forEach((otherKey) => {
          if (
            CALLBACK_QUERY_COMMANDS[key] === CALLBACK_QUERY_COMMANDS[otherKey]
          ) {
            throw new Error(
              `Duplicate callback query value ${CALLBACK_QUERY_COMMANDS[key]} detected for keys ${key} and ${otherKey}`,
            );
          }
        });
    });
  });
});
