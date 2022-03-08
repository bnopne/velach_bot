import { InlineKeyboardMarkup } from 'typegram';

import { Bikecheck } from 'src/modules/entities/bikecheck/bikecheck.entity';
import { CALLBACK_QUERY_COMMANDS } from 'src/common/constants';
import { getCommandButton } from 'src/common/utils/keyboard';

export function getOnSaleKeyboard(bikecheck: Bikecheck): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        getCommandButton(
          '⬅',
          CALLBACK_QUERY_COMMANDS.SHOW_PREVIOUS_ON_SALE_BIKECHECK,
          { bikecheckId: bikecheck.id },
        ),
        getCommandButton(
          '➡',
          CALLBACK_QUERY_COMMANDS.SHOW_NEXT_ON_SALE_BIKECHECK,
          { bikecheckId: bikecheck.id },
        ),
      ],
    ],
  };
}
