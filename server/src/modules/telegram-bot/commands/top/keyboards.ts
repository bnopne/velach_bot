import { InlineKeyboardMarkup } from 'typegram';

import { CALLBACK_QUERY_COMMANDS } from 'src/common/constants';
import { getCommandButton } from 'src/common/utils/telegram-keyboard';

export function getTopKeyboard(
  currentPosition: number,
  topCount: number,
): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      new Array(Math.min(topCount, 5))
        .fill(0)
        .map((_, i) => i + 1)
        .map((p) =>
          p === currentPosition
            ? getCommandButton(
                p.toString(),
                CALLBACK_QUERY_COMMANDS.SHOW_TOP_BIKECHECK,
                { position: null },
              )
            : getCommandButton(
                p.toString(),
                CALLBACK_QUERY_COMMANDS.SHOW_TOP_BIKECHECK,
                { position: p },
              ),
        ),
    ],
  };
}
