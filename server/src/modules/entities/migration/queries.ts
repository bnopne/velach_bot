/** Types generated for queries found in "src/modules/entities/migration/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetAll' parameters type */
export type IGetAllParams = void;

/** 'GetAll' return type */
export interface IGetAllResult {
  createdAt: Date;
  id: string;
  name: string;
}

/** 'GetAll' query type */
export interface IGetAllQuery {
  params: IGetAllParams;
  result: IGetAllResult;
}

const getAllIR: any = {
  name: 'getAll',
  params: [],
  usedParamSet: {},
  statement: {
    body: 'SELECT *\nFROM "Migration"\nORDER BY "createdAt" ASC',
    loc: { a: 19, b: 68, line: 2, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "Migration"
 * ORDER BY "createdAt" ASC
 * ```
 */
export const getAll = new PreparedQuery<IGetAllParams, IGetAllResult>(getAllIR);

/** 'Insert' parameters type */
export interface IInsertParams {
  name: string | null | void;
}

/** 'Insert' return type */
export interface IInsertResult {
  createdAt: Date;
  id: string;
  name: string;
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
      name: 'name',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 133, b: 136, line: 8, col: 9 }] },
    },
  ],
  usedParamSet: { name: true },
  statement: {
    body: 'INSERT INTO "Migration" ("name")\nVALUES (:name)\nRETURNING *',
    loc: { a: 91, b: 149, line: 7, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "Migration" ("name")
 * VALUES (:name)
 * RETURNING *
 * ```
 */
export const insert = new PreparedQuery<IInsertParams, IInsertResult>(insertIR);

/** 'FindByName' parameters type */
export interface IFindByNameParams {
  name: string | null | void;
}

/** 'FindByName' return type */
export interface IFindByNameResult {
  createdAt: Date;
  id: string;
  name: string;
}

/** 'FindByName' query type */
export interface IFindByNameQuery {
  params: IFindByNameParams;
  result: IFindByNameResult;
}

const findByNameIR: any = {
  name: 'findByName',
  params: [
    {
      name: 'name',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 218, b: 221, line: 14, col: 16 }] },
    },
  ],
  usedParamSet: { name: true },
  statement: {
    body: 'SELECT *\nFROM "Migration"\nWHERE "name" = :name',
    loc: { a: 176, b: 221, line: 12, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "Migration"
 * WHERE "name" = :name
 * ```
 */
export const findByName = new PreparedQuery<
  IFindByNameParams,
  IFindByNameResult
>(findByNameIR);
