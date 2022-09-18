/** Types generated for queries found in "src/modules/entities/user/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'FindById' parameters type */
export interface IFindByIdParams {
  id: string | null | void;
}

/** 'FindById' return type */
export interface IFindByIdResult {
  firstName: string | null;
  id: string;
  isBot: boolean | null;
  lastName: string | null;
  stravaLink: string | null;
  username: string | null;
}

/** 'FindById' query type */
export interface IFindByIdQuery {
  params: IFindByIdParams;
  result: IFindByIdResult;
}

const findByIdIR: any = {
  name: 'findById',
  params: [
    {
      name: 'id',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 56, b: 57, line: 4, col: 14 }] },
    },
  ],
  usedParamSet: { id: true },
  statement: {
    body: 'SELECT *\nFROM "User"\nWHERE "id" = :id',
    loc: { a: 21, b: 57, line: 2, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "User"
 * WHERE "id" = :id
 * ```
 */
export const findById = new PreparedQuery<IFindByIdParams, IFindByIdResult>(
  findByIdIR,
);

/** 'InsertUser' parameters type */
export interface IInsertUserParams {
  values: readonly {
    id: string | null | void;
    firstName: string | null | void;
    lastName: string | null | void;
    username: string | null | void;
    isBot: boolean | null | void;
    stravaLink: string | null | void;
  }[];
}

/** 'InsertUser' return type */
export interface IInsertUserResult {
  firstName: string | null;
  id: string;
  isBot: boolean | null;
  lastName: string | null;
  stravaLink: string | null;
  username: string | null;
}

/** 'InsertUser' query type */
export interface IInsertUserQuery {
  params: IInsertUserParams;
  result: IInsertUserResult;
}

const insertUserIR: any = {
  name: 'insertUser',
  params: [
    {
      name: 'values',
      codeRefs: {
        defined: { a: 92, b: 97, line: 8, col: 9 },
        used: [{ a: 259, b: 264, line: 11, col: 8 }],
      },
      transform: {
        type: 'pick_array_spread',
        keys: [
          { name: 'id', required: false },
          { name: 'firstName', required: false },
          { name: 'lastName', required: false },
          { name: 'username', required: false },
          { name: 'isBot', required: false },
          { name: 'stravaLink', required: false },
        ],
      },
      required: false,
    },
  ],
  usedParamSet: { values: true },
  statement: {
    body: 'INSERT INTO "User" ("id", "firstName", "lastName", "username", "isBot", "stravaLink")\nVALUES :values\nRETURNING *',
    loc: { a: 165, b: 276, line: 10, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "User" ("id", "firstName", "lastName", "username", "isBot", "stravaLink")
 * VALUES :values
 * RETURNING *
 * ```
 */
export const insertUser = new PreparedQuery<
  IInsertUserParams,
  IInsertUserResult
>(insertUserIR);

/** 'UpdateUser' parameters type */
export interface IUpdateUserParams {
  firstName: string | null | void;
  id: string | null | void;
  isBot: boolean | null | void;
  lastName: string | null | void;
  stravaLink: string | null | void;
  username: string | null | void;
}

/** 'UpdateUser' return type */
export interface IUpdateUserResult {
  firstName: string | null;
  id: string;
  isBot: boolean | null;
  lastName: string | null;
  stravaLink: string | null;
  username: string | null;
}

/** 'UpdateUser' query type */
export interface IUpdateUserQuery {
  params: IUpdateUserParams;
  result: IUpdateUserResult;
}

const updateUserIR: any = {
  name: 'updateUser',
  params: [
    {
      name: 'firstName',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 340, b: 348, line: 19, col: 17 }] },
    },
    {
      name: 'lastName',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 367, b: 374, line: 20, col: 16 }] },
    },
    {
      name: 'username',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 393, b: 400, line: 21, col: 16 }] },
    },
    {
      name: 'isBot',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 416, b: 420, line: 22, col: 13 }] },
    },
    {
      name: 'stravaLink',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 441, b: 450, line: 23, col: 18 }] },
    },
    {
      name: 'id',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 466, b: 467, line: 24, col: 14 }] },
    },
  ],
  usedParamSet: {
    firstName: true,
    lastName: true,
    username: true,
    isBot: true,
    stravaLink: true,
    id: true,
  },
  statement: {
    body: 'UPDATE "User"\nSET\n  "firstName" = :firstName,\n  "lastName" = :lastName,\n  "username" = :username,\n  "isBot" = :isBot,\n  "stravaLink" = :stravaLink\nWHERE "id" = :id\nRETURNING *',
    loc: { a: 305, b: 479, line: 17, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * UPDATE "User"
 * SET
 *   "firstName" = :firstName,
 *   "lastName" = :lastName,
 *   "username" = :username,
 *   "isBot" = :isBot,
 *   "stravaLink" = :stravaLink
 * WHERE "id" = :id
 * RETURNING *
 * ```
 */
export const updateUser = new PreparedQuery<
  IUpdateUserParams,
  IUpdateUserResult
>(updateUserIR);
