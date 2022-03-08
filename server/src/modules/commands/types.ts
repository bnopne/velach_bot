import { IBaseCallbackQueryData } from 'src/common/types/bot';

export interface IBikecheckCommandData extends IBaseCallbackQueryData {
  bikecheckId: string;
}
