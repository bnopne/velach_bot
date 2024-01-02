/** Types generated for queries found in "src/modules/entities/user-chat-mtm/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'Find' parameters type */
export interface IFindParams {
  chatId?: NumberOrString | null | void;
  userId?: NumberOrString | null | void;
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

const findIR: any = {"usedParamSet":{"userId":true,"chatId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":45,"b":51}]},{"name":"chatId","required":false,"transform":{"type":"scalar"},"locs":[{"a":68,"b":74}]}],"statement":"SELECT *\nFROM \"UserChatMtm\"\nWHERE \"userId\" = :userId AND \"chatId\" = :chatId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "UserChatMtm"
 * WHERE "userId" = :userId AND "chatId" = :chatId
 * ```
 */
export const find = new PreparedQuery<IFindParams,IFindResult>(findIR);


/** 'Insert' parameters type */
export interface IInsertParams {
  userChatMtm: {
    userId: NumberOrString | null | void,
    chatId: NumberOrString | null | void
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

const insertIR: any = {"usedParamSet":{"userChatMtm":true},"params":[{"name":"userChatMtm","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"userId","required":false},{"name":"chatId","required":false}]},"locs":[{"a":54,"b":65}]}],"statement":"INSERT INTO \"UserChatMtm\" (\"userId\", \"chatId\")\nVALUES :userChatMtm\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "UserChatMtm" ("userId", "chatId")
 * VALUES :userChatMtm
 * RETURNING *
 * ```
 */
export const insert = new PreparedQuery<IInsertParams,IInsertResult>(insertIR);


