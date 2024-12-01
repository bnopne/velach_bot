/** Types generated for queries found in "src/modules/entities/bikecheck/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'InsertActive' parameters type */
export interface IInsertActiveParams {
  telegramImageId?: string | null | void;
  userId?: NumberOrString | null | void;
}

/** 'InsertActive' return type */
export interface IInsertActiveResult {
  createdAt: Date;
  id: string;
  isActive: boolean;
  onSale: boolean | null;
  saleRank: number | null;
  telegramImageId: string;
  updatedAt: Date;
  userId: string;
}

/** 'InsertActive' query type */
export interface IInsertActiveQuery {
  params: IInsertActiveParams;
  result: IInsertActiveResult;
}

const insertActiveIR: any = {"usedParamSet":{"userId":true,"telegramImageId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":110,"b":116}]},{"name":"telegramImageId","required":false,"transform":{"type":"scalar"},"locs":[{"a":119,"b":134}]}],"statement":"INSERT INTO \"Bikecheck\" (\"userId\", \"telegramImageId\", \"isActive\", \"createdAt\", \"updatedAt\", \"onSale\")\nVALUES (:userId, :telegramImageId, TRUE, NOW(), NOW(), FALSE)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "Bikecheck" ("userId", "telegramImageId", "isActive", "createdAt", "updatedAt", "onSale")
 * VALUES (:userId, :telegramImageId, TRUE, NOW(), NOW(), FALSE)
 * RETURNING *
 * ```
 */
export const insertActive = new PreparedQuery<IInsertActiveParams,IInsertActiveResult>(insertActiveIR);


/** 'FindById' parameters type */
export interface IFindByIdParams {
  id?: NumberOrString | null | void;
}

/** 'FindById' return type */
export interface IFindByIdResult {
  createdAt: Date;
  id: string;
  isActive: boolean;
  onSale: boolean | null;
  saleRank: number | null;
  telegramImageId: string;
  updatedAt: Date;
  userId: string;
}

/** 'FindById' query type */
export interface IFindByIdQuery {
  params: IFindByIdParams;
  result: IFindByIdResult;
}

const findByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":39,"b":41}]}],"statement":"SELECT *\nFROM \"Bikecheck\"\nWHERE \"id\" = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "Bikecheck"
 * WHERE "id" = :id
 * ```
 */
export const findById = new PreparedQuery<IFindByIdParams,IFindByIdResult>(findByIdIR);


/** 'FindActive' parameters type */
export interface IFindActiveParams {
  userId?: NumberOrString | null | void;
}

/** 'FindActive' return type */
export interface IFindActiveResult {
  createdAt: Date;
  id: string;
  isActive: boolean;
  onSale: boolean | null;
  saleRank: number | null;
  telegramImageId: string;
  updatedAt: Date;
  userId: string;
}

/** 'FindActive' query type */
export interface IFindActiveQuery {
  params: IFindActiveParams;
  result: IFindActiveResult;
}

const findActiveIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":43,"b":49}]}],"statement":"SELECT *\nFROM \"Bikecheck\"\nWHERE \"userId\" = :userId AND \"isActive\" = TRUE\nORDER BY \"createdAt\" DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "Bikecheck"
 * WHERE "userId" = :userId AND "isActive" = TRUE
 * ORDER BY "createdAt" DESC
 * ```
 */
export const findActive = new PreparedQuery<IFindActiveParams,IFindActiveResult>(findActiveIR);


/** 'FindInactive' parameters type */
export interface IFindInactiveParams {
  userId?: NumberOrString | null | void;
}

/** 'FindInactive' return type */
export interface IFindInactiveResult {
  createdAt: Date;
  id: string;
  isActive: boolean;
  onSale: boolean | null;
  saleRank: number | null;
  telegramImageId: string;
  updatedAt: Date;
  userId: string;
}

/** 'FindInactive' query type */
export interface IFindInactiveQuery {
  params: IFindInactiveParams;
  result: IFindInactiveResult;
}

const findInactiveIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":43,"b":49}]}],"statement":"SELECT *\nFROM \"Bikecheck\"\nWHERE \"userId\" = :userId AND \"isActive\" = FALSE\nORDER BY \"createdAt\" DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "Bikecheck"
 * WHERE "userId" = :userId AND "isActive" = FALSE
 * ORDER BY "createdAt" DESC
 * ```
 */
export const findInactive = new PreparedQuery<IFindInactiveParams,IFindInactiveResult>(findInactiveIR);


/** 'Update' parameters type */
export interface IUpdateParams {
  id?: NumberOrString | null | void;
  isActive?: boolean | null | void;
  onSale?: boolean | null | void;
  saleRank?: number | null | void;
  telegramImageId?: string | null | void;
  userId?: NumberOrString | null | void;
}

/** 'Update' return type */
export interface IUpdateResult {
  createdAt: Date;
  id: string;
  isActive: boolean;
  onSale: boolean | null;
  saleRank: number | null;
  telegramImageId: string;
  updatedAt: Date;
  userId: string;
}

/** 'Update' query type */
export interface IUpdateQuery {
  params: IUpdateParams;
  result: IUpdateResult;
}

const updateIR: any = {"usedParamSet":{"userId":true,"telegramImageId":true,"isActive":true,"onSale":true,"saleRank":true,"id":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":36,"b":42}]},{"name":"telegramImageId","required":false,"transform":{"type":"scalar"},"locs":[{"a":67,"b":82}]},{"name":"isActive","required":false,"transform":{"type":"scalar"},"locs":[{"a":100,"b":108}]},{"name":"onSale","required":false,"transform":{"type":"scalar"},"locs":[{"a":147,"b":153}]},{"name":"saleRank","required":false,"transform":{"type":"scalar"},"locs":[{"a":171,"b":179}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":194,"b":196}]}],"statement":"UPDATE \"Bikecheck\"\nSET\n  \"userId\" = :userId,\n  \"telegramImageId\" = :telegramImageId,\n  \"isActive\" = :isActive,\n  \"updatedAt\" = NOW(),\n  \"onSale\" = :onSale,\n  \"saleRank\" = :saleRank\nWHERE \"id\" = :id\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE "Bikecheck"
 * SET
 *   "userId" = :userId,
 *   "telegramImageId" = :telegramImageId,
 *   "isActive" = :isActive,
 *   "updatedAt" = NOW(),
 *   "onSale" = :onSale,
 *   "saleRank" = :saleRank
 * WHERE "id" = :id
 * RETURNING *
 * ```
 */
export const update = new PreparedQuery<IUpdateParams,IUpdateResult>(updateIR);


/** 'GetActiveBikechecksCount' parameters type */
export interface IGetActiveBikechecksCountParams {
  userId?: NumberOrString | null | void;
}

/** 'GetActiveBikechecksCount' return type */
export interface IGetActiveBikechecksCountResult {
  count: string | null;
}

/** 'GetActiveBikechecksCount' query type */
export interface IGetActiveBikechecksCountQuery {
  params: IGetActiveBikechecksCountParams;
  result: IGetActiveBikechecksCountResult;
}

const getActiveBikechecksCountIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":53,"b":59}]}],"statement":"SELECT COUNT(\"id\")\nFROM \"Bikecheck\"\nWHERE \"userId\" = :userId AND \"isActive\" = TRUE"};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT("id")
 * FROM "Bikecheck"
 * WHERE "userId" = :userId AND "isActive" = TRUE
 * ```
 */
export const getActiveBikechecksCount = new PreparedQuery<IGetActiveBikechecksCountParams,IGetActiveBikechecksCountResult>(getActiveBikechecksCountIR);


/** 'FindOnSale' parameters type */
export type IFindOnSaleParams = void;

/** 'FindOnSale' return type */
export interface IFindOnSaleResult {
  createdAt: Date;
  id: string;
  isActive: boolean;
  onSale: boolean | null;
  saleRank: number | null;
  telegramImageId: string;
  updatedAt: Date;
  userId: string;
}

/** 'FindOnSale' query type */
export interface IFindOnSaleQuery {
  params: IFindOnSaleParams;
  result: IFindOnSaleResult;
}

const findOnSaleIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT *\nFROM \"Bikecheck\"\nWHERE \"onSale\" = TRUE and \"isActive\" = TRUE\nORDER BY \"saleRank\" DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "Bikecheck"
 * WHERE "onSale" = TRUE and "isActive" = TRUE
 * ORDER BY "saleRank" DESC
 * ```
 */
export const findOnSale = new PreparedQuery<IFindOnSaleParams,IFindOnSaleResult>(findOnSaleIR);


/** 'FindLiked' parameters type */
export interface IFindLikedParams {
  userId?: NumberOrString | null | void;
}

/** 'FindLiked' return type */
export interface IFindLikedResult {
  createdAt: Date;
  id: string;
  isActive: boolean;
  likeDate: Date;
  onSale: boolean | null;
  saleRank: number | null;
  telegramImageId: string;
  updatedAt: Date;
  userId: string;
}

/** 'FindLiked' query type */
export interface IFindLikedQuery {
  params: IFindLikedParams;
  result: IFindLikedResult;
}

const findLikedIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":223,"b":229}]}],"statement":"SELECT T_BIKECHECK.*, T_VOTE.\"updatedAt\" AS \"likeDate\"\nFROM\n(\n  SELECT *\n  FROM \"Bikecheck\"\n  where \"isActive\" = TRUE\n) T_BIKECHECK\nINNER JOIN\n(\n  SELECT \"bikecheckId\", \"updatedAt\"\n  FROM \"BikecheckVote\"\n  WHERE \"userId\" = :userId AND \"points\" > 0\n) T_VOTE\nON T_BIKECHECK.\"id\" = T_VOTE.\"bikecheckId\"\nORDER BY \"likeDate\" DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT T_BIKECHECK.*, T_VOTE."updatedAt" AS "likeDate"
 * FROM
 * (
 *   SELECT *
 *   FROM "Bikecheck"
 *   where "isActive" = TRUE
 * ) T_BIKECHECK
 * INNER JOIN
 * (
 *   SELECT "bikecheckId", "updatedAt"
 *   FROM "BikecheckVote"
 *   WHERE "userId" = :userId AND "points" > 0
 * ) T_VOTE
 * ON T_BIKECHECK."id" = T_VOTE."bikecheckId"
 * ORDER BY "likeDate" DESC
 * ```
 */
export const findLiked = new PreparedQuery<IFindLikedParams,IFindLikedResult>(findLikedIR);


