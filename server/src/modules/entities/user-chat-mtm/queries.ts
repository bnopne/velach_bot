/** Types generated for queries found in "src/modules/entities/user-chat-mtm/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'Find' parameters type */
export interface IFindParams {
  chatId: string | null | void;
  userId: string | null | void;
}

/** 'Find' return type */
export interface IFindResult {
  chatId: string;
  userId: string;
}

/** 'Find' query type */
export interface IFindQuery {
  params: IFindParams;
  result: IFindResult;
}

const findIR: any = {
  name: 'find',
  params: [
    {
      name: 'userId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 66, b: 71, line: 4, col: 18 }] },
    },
    {
      name: 'chatId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 89, b: 94, line: 4, col: 41 }] },
    },
  ],
  usedParamSet: { userId: true, chatId: true },
  statement: {
    body: 'SELECT *\r\nFROM "UserChatMtm"\r\nWHERE "userId" = :userId AND "chatId" = :chatId',
    loc: { a: 18, b: 94, line: 2, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "UserChatMtm"
 * WHERE "userId" = :userId AND "chatId" = :chatId
 * ```
 */
export const find = new PreparedQuery<IFindParams, IFindResult>(findIR);

/** 'Insert' parameters type */
export interface IInsertParams {
  userChatMtm: {
    userId: string | null | void;
    chatId: string | null | void;
  };
}

/** 'Insert' return type */
export interface IInsertResult {
  chatId: string;
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
      name: 'userChatMtm',
      codeRefs: {
        defined: { a: 129, b: 139, line: 8, col: 9 },
        used: [{ a: 222, b: 232, line: 11, col: 8 }],
      },
      transform: {
        type: 'pick_tuple',
        keys: [
          { name: 'userId', required: false },
          { name: 'chatId', required: false },
        ],
      },
      required: false,
    },
  ],
  usedParamSet: { userChatMtm: true },
  statement: {
    body: 'INSERT INTO "UserChatMtm" ("userId", "chatId")\r\nVALUES :userChatMtm\r\nRETURNING *',
    loc: { a: 166, b: 245, line: 10, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "UserChatMtm" ("userId", "chatId")
 * VALUES :userChatMtm
 * RETURNING *
 * ```
 */
export const insert = new PreparedQuery<IInsertParams, IInsertResult>(insertIR);
