export type Chat = {
  id: string;
  title?: string;
  type?: string;
};

export type GetChatsResponse = {
  chats: Chat[];
};
