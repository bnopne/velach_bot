import { type Request } from 'express';

import { type JWTPayload } from 'src/modules/auth/types';

export type AuthorizedRequest = Request & {
  jwtPayload: JWTPayload;
};
