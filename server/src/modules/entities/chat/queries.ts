/** Types generated for queries found in "src/modules/entities/chat/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'FindById' parameters type */
export interface IFindByIdParams {
  id: string | null | void;
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

const findByIdIR: any = {
  name: 'findById',
  params: [
    {
      name: 'id',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 59, b: 60, line: 4, col: 14 }] },
    },
  ],
  usedParamSet: { id: true },
  statement: {
    body: 'SELECT *\r\nFROM "Chat"\r\nWHERE "id" = :id',
    loc: { a: 22, b: 60, line: 2, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "Chat"
 * WHERE "id" = :id
 * ```
 */
export const findById = new PreparedQuery<IFindByIdParams, IFindByIdResult>(
  findByIdIR,
);

/** 'InsertChat' parameters type */
export interface IInsertChatParams {
  values: readonly {
    id: string | null | void;
    type: string | null | void;
    title: string | null | void;
  }[];
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

const insertChatIR: any = {
  name: 'insertChat',
  params: [
    {
      name: 'values',
      codeRefs: {
        defined: { a: 99, b: 104, line: 8, col: 9 },
        used: [{ a: 189, b: 194, line: 11, col: 8 }],
      },
      transform: {
        type: 'pick_array_spread',
        keys: [
          { name: 'id', required: false },
          { name: 'type', required: false },
          { name: 'title', required: false },
        ],
      },
      required: false,
    },
  ],
  usedParamSet: { values: true },
  statement: {
    body: 'INSERT INTO "Chat" ("id", "type", "title")\r\nVALUES :values\r\nRETURNING *',
    loc: { a: 137, b: 207, line: 10, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "Chat" ("id", "type", "title")
 * VALUES :values
 * RETURNING *
 * ```
 */
export const insertChat = new PreparedQuery<
  IInsertChatParams,
  IInsertChatResult
>(insertChatIR);

/** 'UpdateChat' parameters type */
export interface IUpdateChatParams {
  id: string | null | void;
  title: string | null | void;
  type: string | null | void;
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

const updateChatIR: any = {
  name: 'updateChat',
  params: [
    {
      name: 'type',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 273, b: 276, line: 19, col: 12 }] },
    },
    {
      name: 'title',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 293, b: 297, line: 20, col: 13 }] },
    },
    {
      name: 'id',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 314, b: 315, line: 21, col: 14 }] },
    },
  ],
  usedParamSet: { type: true, title: true, id: true },
  statement: {
    body: 'UPDATE "Chat"\r\nSET\r\n  "type" = :type,\r\n  "title" = :title\r\nWHERE "id" = :id\r\nRETURNING *',
    loc: { a: 241, b: 328, line: 17, col: 0 },
  },
};

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
export const updateChat = new PreparedQuery<
  IUpdateChatParams,
  IUpdateChatResult
>(updateChatIR);
