/** Types generated for queries found in "src/modules/entities/admin-site-access/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'FindByUserId' parameters type */
export interface IFindByUserIdParams {
  userId: string | null | void;
}

/** 'FindByUserId' return type */
export interface IFindByUserIdResult {
  userId: string;
}

/** 'FindByUserId' query type */
export interface IFindByUserIdQuery {
  params: IFindByUserIdParams;
  result: IFindByUserIdResult;
}

const findByUserIdIR: any = {
  name: 'findByUserId',
  params: [
    {
      name: 'userId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 75, b: 80, line: 4, col: 18 }] },
    },
  ],
  usedParamSet: { userId: true },
  statement: {
    body: 'SELECT *\nFROM "AdminSiteAccess"\nWHERE "userId" = :userId',
    loc: { a: 25, b: 80, line: 2, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "AdminSiteAccess"
 * WHERE "userId" = :userId
 * ```
 */
export const findByUserId = new PreparedQuery<
  IFindByUserIdParams,
  IFindByUserIdResult
>(findByUserIdIR);

/** 'Insert' parameters type */
export interface IInsertParams {
  userId: string | null | void;
}

/** 'Insert' return type */
export interface IInsertResult {
  userId: string;
}

/** 'Insert' query type */
export interface IInsertQuery {
  params: IInsertParams;
  result: IInsertResult;
}

const insertIR: any = {
  name: 'insert',
  params: [
    {
      name: 'userId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 153, b: 158, line: 8, col: 9 }] },
    },
  ],
  usedParamSet: { userId: true },
  statement: {
    body: 'INSERT INTO "AdminSiteAccess" ("userId")\nVALUES (:userId)\nRETURNING *',
    loc: { a: 103, b: 171, line: 7, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "AdminSiteAccess" ("userId")
 * VALUES (:userId)
 * RETURNING *
 * ```
 */
export const insert = new PreparedQuery<IInsertParams, IInsertResult>(insertIR);
