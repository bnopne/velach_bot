/** Types generated for queries found in "src/modules/entities/admin/queries.sql" */
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
      codeRefs: { used: [{ a: 65, b: 70, line: 4, col: 18 }] },
    },
  ],
  usedParamSet: { userId: true },
  statement: {
    body: 'SELECT *\nFROM "Admin"\nWHERE "userId" = :userId',
    loc: { a: 25, b: 70, line: 2, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "Admin"
 * WHERE "userId" = :userId
 * ```
 */
export const findByUserId = new PreparedQuery<
  IFindByUserIdParams,
  IFindByUserIdResult
>(findByUserIdIR);

/** 'InsertAdmin' parameters type */
export interface IInsertAdminParams {
  userId: string | null | void;
}

/** 'InsertAdmin' return type */
export interface IInsertAdminResult {
  userId: string;
}

/** 'InsertAdmin' query type */
export interface IInsertAdminQuery {
  params: IInsertAdminParams;
  result: IInsertAdminResult;
}

const insertAdminIR: any = {
  name: 'insertAdmin',
  params: [
    {
      name: 'userId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 139, b: 144, line: 9, col: 9 }] },
    },
  ],
  usedParamSet: { userId: true },
  statement: {
    body: 'INSERT INTO "Admin" ("userId")\nVALUES (:userId)\nRETURNING *',
    loc: { a: 99, b: 157, line: 8, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "Admin" ("userId")
 * VALUES (:userId)
 * RETURNING *
 * ```
 */
export const insertAdmin = new PreparedQuery<
  IInsertAdminParams,
  IInsertAdminResult
>(insertAdminIR);

/** 'DeleteAdmin' parameters type */
export interface IDeleteAdminParams {
  userId: string | null | void;
}

/** 'DeleteAdmin' return type */
export type IDeleteAdminResult = void;

/** 'DeleteAdmin' query type */
export interface IDeleteAdminQuery {
  params: IDeleteAdminParams;
  result: IDeleteAdminResult;
}

const deleteAdminIR: any = {
  name: 'deleteAdmin',
  params: [
    {
      name: 'userId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 223, b: 228, line: 14, col: 18 }] },
    },
  ],
  usedParamSet: { userId: true },
  statement: {
    body: 'DELETE FROM "Admin"\nWHERE "userId" = :userId',
    loc: { a: 185, b: 228, line: 13, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM "Admin"
 * WHERE "userId" = :userId
 * ```
 */
export const deleteAdmin = new PreparedQuery<
  IDeleteAdminParams,
  IDeleteAdminResult
>(deleteAdminIR);
