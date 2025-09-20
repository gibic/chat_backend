import type {
  DBChat,
  DBCreateChat,
  DBCreateMessage,
  DBCreateUser,
  DBMessage,
  DBUser,
} from './db';

export type APICreateUser = DBCreateUser;
export type APICreateChat = DBCreateChat;
export type APICreateMessage = DBCreateMessage;
export type APIUser = Omit<DBUser, 'password'>;
export type APIChat = DBChat;
export type APIMessage = DBMessage;
