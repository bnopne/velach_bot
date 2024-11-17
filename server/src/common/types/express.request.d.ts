import { PoolClient } from 'pg';

import { JwtPayload } from 'src/modules/admin-site-auth/types';

declare global {
  namespace Express {
    interface Request {
      dbConnection?: PoolClient;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends JwtPayload {}
  }
}
