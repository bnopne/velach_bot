/** Types generated for queries found in "src/modules/entities/bikecheck-chat-mtm/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'Find' parameters type */
export interface IFindParams {
  bikecheckId: string | null | void;
  chatId: string | null | void;
}

/** 'Find' return type */
export interface IFindResult {
  bikecheckId: string;
  chatId: string;
  isBanned: boolean;
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
      name: 'bikecheckId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 76, b: 86, line: 4, col: 23 }] },
    },
    {
      name: 'chatId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 104, b: 109, line: 4, col: 51 }] },
    },
  ],
  usedParamSet: { bikecheckId: true, chatId: true },
  statement: {
    body: 'SELECT *\r\nFROM "BikecheckChatMtm"\r\nWHERE "bikecheckId" = :bikecheckId AND "chatId" = :chatId',
    loc: { a: 18, b: 109, line: 2, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "BikecheckChatMtm"
 * WHERE "bikecheckId" = :bikecheckId AND "chatId" = :chatId
 * ```
 */
export const find = new PreparedQuery<IFindParams, IFindResult>(findIR);
