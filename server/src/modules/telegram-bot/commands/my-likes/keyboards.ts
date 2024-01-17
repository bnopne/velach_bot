import { InlineKeyboardMarkup } from '@telegraf/types';

import { Bikecheck } from 'src/modules/entities/bikecheck/bikecheck.entity';
import { CALLBACK_QUERY_COMMANDS } from 'src/common/constants';
import { getCommandButton } from 'src/common/utils/telegram-keyboard';

export function getMyLikesKeyboard(bikecheck: Bikecheck): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        getCommandButton(
          '⬅',
          CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_LIKED_BIKECHECK,
          {
            bikecheckId: bikecheck.id,
          },
        ),
        getCommandButton(
          '➡',
          CALLBACK_QUERY_COMMANDS.SHOW_NEXT_LIKED_BIKECHECK,
          {
            bikecheckId: bikecheck.id,
          },
        ),
      ],
    ],
  };
}
