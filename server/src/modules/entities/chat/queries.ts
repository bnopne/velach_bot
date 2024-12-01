/** Types generated for queries found in "src/modules/entities/chat/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'FindById' parameters type */
export interface IFindByIdParams {
  id?: NumberOrString | null | void;
}

/** 'FindById' return type */
export interface IFindByIdResult {
  id: string;
  title: string | null;
  type: string | null;
}

/** 'FindById' query type */
export interface IFindByIdQuery {
  params: IFindByIdParams;
  result: IFindByIdResult;
}

const findByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":34,"b":36}]}],"statement":"SELECT *\nFROM \"Chat\"\nWHERE \"id\" = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "Chat"
 * WHERE "id" = :id
 * ```
 */
export const findById = new PreparedQuery<IFindByIdParams,IFindByIdResult>(findByIdIR);


/** 'InsertChat' parameters type */
export interface IInsertChatParams {
  values: readonly ({
    id: NumberOrString | null | void,
    type: string | null | void,
    title: string | null | void
  })[];
}

/** 'InsertChat' return type */
export interface IInsertChatResult {
  id: string;
  title: string | null;
  type: string | null;
}

/** 'InsertChat' query type */
export interface IInsertChatQuery {
  params: IInsertChatParams;
  result: IInsertChatResult;
}

const insertChatIR: any = {"usedParamSet":{"values":true},"params":[{"name":"values","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"id","required":false},{"name":"type","required":false},{"name":"title","required":false}]},"locs":[{"a":50,"b":56}]}],"statement":"INSERT INTO \"Chat\" (\"id\", \"type\", \"title\")\nVALUES :values\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "Chat" ("id", "type", "title")
 * VALUES :values
 * RETURNING *
 * ```
 */
export const insertChat = new PreparedQuery<IInsertChatParams,IInsertChatResult>(insertChatIR);


/** 'UpdateChat' parameters type */
export interface IUpdateChatParams {
  id?: NumberOrString | null | void;
  title?: string | null | void;
  type?: string | null | void;
}

/** 'UpdateChat' return type */
export interface IUpdateChatResult {
  id: string;
  title: string | null;
  type: string | null;
}

/** 'UpdateChat' query type */
export interface IUpdateChatQuery {
  params: IUpdateChatParams;
  result: IUpdateChatResult;
}

const updateChatIR: any = {"usedParamSet":{"type":true,"title":true,"id":true},"params":[{"name":"type","required":false,"transform":{"type":"scalar"},"locs":[{"a":29,"b":33}]},{"name":"title","required":false,"transform":{"type":"scalar"},"locs":[{"a":48,"b":53}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":68,"b":70}]}],"statement":"UPDATE \"Chat\"\nSET\n  \"type\" = :type,\n  \"title\" = :title\nWHERE \"id\" = :id\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE "Chat"
 * SET
 *   "type" = :type,
 *   "title" = :title
 * WHERE "id" = :id
 * RETURNING *
 * ```
 */
export const updateChat = new PreparedQuery<IUpdateChatParams,IUpdateChatResult>(updateChatIR);


