import { InlineKeyboardMarkup } from 'typegram';

import { Bikecheck } from 'src/modules/entities/bikecheck/bikecheck.entity';
import { CALLBACK_QUERY_COMMANDS } from 'src/common/constants';
import { getCommandButton } from 'src/common/utils/telegram-keyboard';

export function getPublicBikecheckKeyboard(
  bikecheck: Bikecheck,
): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        getCommandButton('⬅', CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_BIKECHECK, {
          bikecheckId: bikecheck.id,
        }),
        getCommandButton('👍', CALLBACK_QUERY_COMMANDS.LIKE, {
          bikecheckId: bikecheck.id,
        }),
        getCommandButton('👎', CALLBACK_QUERY_COMMANDS.DISLIKE, {
          bikecheckId: bikecheck.id,
        }),
        getCommandButton('➡', CALLBACK_QUERY_COMMANDS.SHOW_NEXT_BIKECHECK, {
          bikecheckId: bikecheck.id,
        }),
      ],
    ],
  };
}

export function getPrivateBikecheckKeyboard(
  bikecheck: Bikecheck,
): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        getCommandButton('⬅', CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_BIKECHECK, {
          bikecheckId: bikecheck.id,
        }),
        getCommandButton('➡', CALLBACK_QUERY_COMMANDS.SHOW_NEXT_BIKECHECK, {
          bikecheckId: bikecheck.id,
        }),
      ],
      [
        getCommandButton('Удалить', CALLBACK_QUERY_COMMANDS.DELETE_BIKECHECK, {
          bikecheckId: bikecheck.id,
        }),
        getCommandButton(
          bikecheck.onSale ? 'Снять с продажи' : 'Выставить на продажу',
          CALLBACK_QUERY_COMMANDS.TOGGLE_ON_SALE,
          {
            bikecheckId: bikecheck.id,
          },
        ),
      ],
    ],
  };
}
