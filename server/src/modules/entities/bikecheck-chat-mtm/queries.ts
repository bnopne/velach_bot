/** Types generated for queries found in "src/modules/entities/bikecheck-chat-mtm/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'Find' parameters type */
export interface IFindParams {
  bikecheckId?: NumberOrString | null | void;
  chatId?: NumberOrString | null | void;
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

const findIR: any = {"usedParamSet":{"bikecheckId":true,"chatId":true},"params":[{"name":"bikecheckId","required":false,"transform":{"type":"scalar"},"locs":[{"a":55,"b":66}]},{"name":"chatId","required":false,"transform":{"type":"scalar"},"locs":[{"a":83,"b":89}]}],"statement":"SELECT *\nFROM \"BikecheckChatMtm\"\nWHERE \"bikecheckId\" = :bikecheckId AND \"chatId\" = :chatId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "BikecheckChatMtm"
 * WHERE "bikecheckId" = :bikecheckId AND "chatId" = :chatId
 * ```
 */
export const find = new PreparedQuery<IFindParams,IFindResult>(findIR);


