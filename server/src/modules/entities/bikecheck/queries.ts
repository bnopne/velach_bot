/** Types generated for queries found in "src/modules/entities/bikecheck/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'InsertActive' parameters type */
export interface IInsertActiveParams {
  telegramImageId: string | null | void;
  userId: string | null | void;
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

const insertActiveIR: any = {"name":"insertActive","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":138,"b":143,"line":3,"col":9}]}},{"name":"telegramImageId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":147,"b":161,"line":3,"col":18}]}}],"usedParamSet":{"userId":true,"telegramImageId":true},"statement":{"body":"INSERT INTO \"Bikecheck\" (\"userId\", \"telegramImageId\", \"isActive\", \"createdAt\", \"updatedAt\", \"onSale\")\r\nVALUES (:userId, :telegramImageId, TRUE, NOW(), NOW(), FALSE)\r\nRETURNING *","loc":{"a":26,"b":202,"line":2,"col":0}}};

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
  id: string | null | void;
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

const findByIdIR: any = {"name":"findById","params":[{"name":"id","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":272,"b":273,"line":9,"col":14}]}}],"usedParamSet":{"id":true},"statement":{"body":"SELECT *\r\nFROM \"Bikecheck\"\r\nWHERE \"id\" = :id","loc":{"a":230,"b":273,"line":7,"col":0}}};

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
  userId: string | null | void;
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

const findActiveIR: any = {"name":"findActive","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":349,"b":354,"line":14,"col":18}]}}],"usedParamSet":{"userId":true},"statement":{"body":"SELECT *\r\nFROM \"Bikecheck\"\r\nWHERE \"userId\" = :userId AND \"isActive\" = TRUE\r\nORDER BY \"createdAt\" DESC","loc":{"a":303,"b":403,"line":12,"col":0}}};

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
  userId: string | null | void;
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

const findInactiveIR: any = {"name":"findInactive","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":481,"b":486,"line":20,"col":18}]}}],"usedParamSet":{"userId":true},"statement":{"body":"SELECT *\r\nFROM \"Bikecheck\"\r\nWHERE \"userId\" = :userId AND \"isActive\" = FALSE\r\nORDER BY \"createdAt\" DESC","loc":{"a":435,"b":536,"line":18,"col":0}}};

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
  id: string | null | void;
  isActive: boolean | null | void;
  onSale: boolean | null | void;
  saleRank: number | null | void;
  telegramImageId: string | null | void;
  userId: string | null | void;
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

const updateIR: any = {"name":"update","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":601,"b":606,"line":26,"col":14}]}},{"name":"telegramImageId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":633,"b":647,"line":27,"col":23}]}},{"name":"isActive","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":667,"b":674,"line":28,"col":16}]}},{"name":"onSale","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":716,"b":721,"line":30,"col":14}]}},{"name":"saleRank","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":741,"b":748,"line":31,"col":16}]}},{"name":"id","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":765,"b":766,"line":32,"col":14}]}}],"usedParamSet":{"userId":true,"telegramImageId":true,"isActive":true,"onSale":true,"saleRank":true,"id":true},"statement":{"body":"UPDATE \"Bikecheck\"\r\nSET\r\n  \"userId\" = :userId,\r\n  \"telegramImageId\" = :telegramImageId,\r\n  \"isActive\" = :isActive,\r\n  \"updatedAt\" = NOW(),\r\n  \"onSale\" = :onSale,\r\n  \"saleRank\" = :saleRank\r\nWHERE \"id\" = :id\r\nRETURNING *","loc":{"a":562,"b":779,"line":24,"col":0}}};

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
  userId: string | null | void;
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

const getActiveBikechecksCountIR: any = {"name":"getActiveBikechecksCount","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":879,"b":884,"line":38,"col":18}]}}],"usedParamSet":{"userId":true},"statement":{"body":"SELECT COUNT(\"id\")\r\nFROM \"Bikecheck\"\r\nWHERE \"userId\" = :userId AND \"isActive\" = TRUE","loc":{"a":823,"b":906,"line":36,"col":0}}};

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

const findOnSaleIR: any = {"name":"findOnSale","params":[],"usedParamSet":{},"statement":{"body":"SELECT *\r\nFROM \"Bikecheck\"\r\nWHERE \"onSale\" = TRUE and \"isActive\" = TRUE\r\nORDER BY \"saleRank\" DESC","loc":{"a":936,"b":1032,"line":41,"col":0}}};

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
  userId: string | null | void;
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

const findLikedIR: any = {"name":"findLiked","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1296,"b":1301,"line":58,"col":20}]}}],"usedParamSet":{"userId":true},"statement":{"body":"SELECT T_BIKECHECK.*, T_VOTE.\"updatedAt\" AS \"likeDate\"\r\nFROM\r\n(\r\n  SELECT *\r\n  FROM \"Bikecheck\"\r\n  where \"isActive\" = TRUE\r\n) T_BIKECHECK\r\nINNER JOIN\r\n(\r\n  SELECT \"bikecheckId\", \"updatedAt\"\r\n  FROM \"BikecheckVote\"\r\n  WHERE \"userId\" = :userId AND \"points\" > 0\r\n) T_VOTE\r\nON T_BIKECHECK.\"id\" = T_VOTE.\"bikecheckId\"\r\nORDER BY \"likeDate\" DESC","loc":{"a":1061,"b":1398,"line":47,"col":0}}};

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


