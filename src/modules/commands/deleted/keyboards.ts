import { InlineKeyboardMarkup } from 'typegram';

import { Bikecheck } from 'src/modules/entities/bikecheck/bikecheck.entity';
import { CALLBACK_QUERY_COMMANDS } from 'src/common/constants';
import { getCommandButton } from 'src/common/utils/keyboard';

export function getDeletedKeyboard(bikecheck: Bikecheck): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        getCommandButton(
          '⬅',
          CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_DELETED_BIKECHECK,
          {
            bikecheckId: bikecheck.id,
          },
        ),
        getCommandButton(
          '➡',
          CALLBACK_QUERY_COMMANDS.SHOW_NEXT_DELETED_BIKECHECK,
          {
            bikecheckId: bikecheck.id,
          },
        ),
      ],
      [
        getCommandButton(
          'Восстановить',
          CALLBACK_QUERY_COMMANDS.RESTORE_BIKECHECK,
          {
            bikecheckId: bikecheck.id,
          },
        ),
      ],
    ],
  };
}
