import { TBaseCallbackQueryData } from 'src/common/types/bot';

export interface IBikecheckCommandData extends TBaseCallbackQueryData {
  bikecheckId: string;
}
