import { TBaseCallbackQueryData } from 'src/common/types/bot';
import { TOptional } from 'src/common/types/utils';

export interface ITopCallbackQueryData extends TBaseCallbackQueryData {
  position: TOptional<number>;
}
