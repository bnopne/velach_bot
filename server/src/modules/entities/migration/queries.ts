/** Types generated for queries found in "src/modules/entities/migration/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

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

const getAllIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT *\nFROM \"Migration\"\nORDER BY \"createdAt\" ASC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "Migration"
 * ORDER BY "createdAt" ASC
 * ```
 */
export const getAll = new PreparedQuery<IGetAllParams,IGetAllResult>(getAllIR);


/** 'Insert' parameters type */
export interface IInsertParams {
  name?: string | null | void;
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

const insertIR: any = {"usedParamSet":{"name":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":41,"b":45}]}],"statement":"INSERT INTO \"Migration\" (\"name\")\nVALUES (:name)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "Migration" ("name")
 * VALUES (:name)
 * RETURNING *
 * ```
 */
export const insert = new PreparedQuery<IInsertParams,IInsertResult>(insertIR);


/** 'FindByName' parameters type */
export interface IFindByNameParams {
  name?: string | null | void;
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

const findByNameIR: any = {"usedParamSet":{"name":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":41,"b":45}]}],"statement":"SELECT *\nFROM \"Migration\"\nWHERE \"name\" = :name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "Migration"
 * WHERE "name" = :name
 * ```
 */
export const findByName = new PreparedQuery<IFindByNameParams,IFindByNameResult>(findByNameIR);


