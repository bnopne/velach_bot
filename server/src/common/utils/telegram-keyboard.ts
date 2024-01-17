import { InlineKeyboardButton } from '@telegraf/types';

export function serializeCallbackData(data: Record<string, any>): string {
  const result = JSON.stringify(data);

  if (Buffer.from(result).byteLength > 64) {
    throw new Error(`Callback data too long\n${result}`);
  }

  return result;
}

export function parseCallbackData<T>(rawData: string): T {
  return JSON.parse(rawData);
}

export function getCommandButton(
  text: string,
  command: string,
  data: Record<string, any>,
): InlineKeyboardButton.CallbackButton {
  return {
    text,
    callback_data: serializeCallbackData({
      c: command,
      ...data,
    }),
  };
}
