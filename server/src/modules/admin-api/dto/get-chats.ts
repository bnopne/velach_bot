import { Chat } from 'src/modules/entities/chat/chat.entity';
import { type Optional } from 'src/common/types/utils';

export class ChatDto {
  id: string;
  title: Optional<string>;
  type: Optional<string>;

  static fromEntity(chat: Chat): ChatDto {
    const dto = new ChatDto();

    dto.id = chat.id;
    dto.title = chat.title;
    dto.type = chat.type;

    return dto;
  }
}
