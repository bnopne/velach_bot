import { IBaseCallbackQueryData } from 'src/common/types/bot';
import { TOptional } from 'src/common/types/utils';

export interface ITopCallbackQueryData extends IBaseCallbackQueryData {
  position: TOptional<number>;
}
