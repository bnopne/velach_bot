import { type Request } from 'express';

export type JWTPayload = {
  userId: string;
};

export type AuthorizedRequest = Request & {
  userId: string;
};
