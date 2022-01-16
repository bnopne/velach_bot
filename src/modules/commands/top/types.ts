import { IBaseCallbackQueryData } from 'src/common/types/bot';
import { Optional } from 'src/common/types/utils';

export interface ITopCallbackQueryData extends IBaseCallbackQueryData {
  position: Optional<number>;
}
