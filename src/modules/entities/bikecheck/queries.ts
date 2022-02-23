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

const insertActiveIR: any = {"name":"insertActive","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":136,"b":141,"line":3,"col":9}]}},{"name":"telegramImageId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":145,"b":159,"line":3,"col":18}]}}],"usedParamSet":{"userId":true,"telegramImageId":true},"statement":{"body":"INSERT INTO \"Bikecheck\" (\"userId\", \"telegramImageId\", \"isActive\", \"createdAt\", \"updatedAt\", \"onSale\")\nVALUES (:userId, :telegramImageId, TRUE, NOW(), NOW(), FALSE)\nRETURNING *","loc":{"a":25,"b":199,"line":2,"col":0}}};

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

const findByIdIR: any = {"name":"findById","params":[{"name":"id","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":264,"b":265,"line":9,"col":14}]}}],"usedParamSet":{"id":true},"statement":{"body":"SELECT *\nFROM \"Bikecheck\"\nWHERE \"id\" = :id","loc":{"a":224,"b":265,"line":7,"col":0}}};

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

const findActiveIR: any = {"name":"findActive","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":336,"b":341,"line":14,"col":18}]}}],"usedParamSet":{"userId":true},"statement":{"body":"SELECT *\nFROM \"Bikecheck\"\nWHERE \"userId\" = :userId AND \"isActive\" = TRUE\nORDER BY \"createdAt\" DESC","loc":{"a":292,"b":389,"line":12,"col":0}}};

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

const findInactiveIR: any = {"name":"findInactive","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":462,"b":467,"line":20,"col":18}]}}],"usedParamSet":{"userId":true},"statement":{"body":"SELECT *\nFROM \"Bikecheck\"\nWHERE \"userId\" = :userId AND \"isActive\" = FALSE\nORDER BY \"createdAt\" DESC","loc":{"a":418,"b":516,"line":18,"col":0}}};

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

const updateIR: any = {"name":"update","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":576,"b":581,"line":26,"col":14}]}},{"name":"telegramImageId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":607,"b":621,"line":27,"col":23}]}},{"name":"isActive","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":640,"b":647,"line":28,"col":16}]}},{"name":"onSale","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":687,"b":692,"line":30,"col":14}]}},{"name":"saleRank","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":711,"b":718,"line":31,"col":16}]}},{"name":"id","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":734,"b":735,"line":32,"col":14}]}}],"usedParamSet":{"userId":true,"telegramImageId":true,"isActive":true,"onSale":true,"saleRank":true,"id":true},"statement":{"body":"UPDATE \"Bikecheck\"\nSET\n  \"userId\" = :userId,\n  \"telegramImageId\" = :telegramImageId,\n  \"isActive\" = :isActive,\n  \"updatedAt\" = NOW(),\n  \"onSale\" = :onSale,\n  \"saleRank\" = :saleRank\nWHERE \"id\" = :id\nRETURNING *","loc":{"a":539,"b":747,"line":24,"col":0}}};

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

const getActiveBikechecksCountIR: any = {"name":"getActiveBikechecksCount","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":842,"b":847,"line":38,"col":18}]}}],"usedParamSet":{"userId":true},"statement":{"body":"SELECT COUNT(\"id\")\nFROM \"Bikecheck\"\nWHERE \"userId\" = :userId AND \"isActive\" = TRUE","loc":{"a":788,"b":869,"line":36,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT("id")
 * FROM "Bikecheck"
 * WHERE "userId" = :userId AND "isActive" = TRUE
 * ```
 */
export const getActiveBikechecksCount = new PreparedQuery<IGetActiveBikechecksCountParams,IGetActiveBikechecksCountResult>(getActiveBikechecksCountIR);


/** 'GetRank' parameters type */
export interface IGetRankParams {
  bikecheckId: string | null | void;
}

/** 'GetRank' return type */
export interface IGetRankResult {
  rank: string | null;
}

/** 'GetRank' query type */
export interface IGetRankQuery {
  params: IGetRankParams;
  result: IGetRankResult;
}

const getRankIR: any = {"name":"getRank","params":[{"name":"bikecheckId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":1311,"b":1321,"line":58,"col":14}]}}],"usedParamSet":{"bikecheckId":true},"statement":{"body":"SELECT \"rank\"\nFROM (\n  SELECT id, \"likes\", row_number () over (ORDER BY \"likes\" desc) AS \"rank\"\n  FROM (\n    SELECT id, count(\"likes\") AS \"likes\"\n    FROM\n    (\n      SELECT id FROM \"Bikecheck\" b WHERE b.\"isActive\" = TRUE\n    ) AS T1\n    INNER JOIN\n    (\n      SELECT \"bikecheckId\" AS \"likes\" FROM \"BikecheckVote\" bv WHERE bv.points > 0\n    ) AS T2\n    ON T1.id = T2.\"likes\"\n    GROUP BY T1.id\n  ) T\n) T\nWHERE T.id = :bikecheckId","loc":{"a":893,"b":1321,"line":41,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT "rank"
 * FROM (
 *   SELECT id, "likes", row_number () over (ORDER BY "likes" desc) AS "rank"
 *   FROM (
 *     SELECT id, count("likes") AS "likes"
 *     FROM
 *     (
 *       SELECT id FROM "Bikecheck" b WHERE b."isActive" = TRUE
 *     ) AS T1
 *     INNER JOIN
 *     (
 *       SELECT "bikecheckId" AS "likes" FROM "BikecheckVote" bv WHERE bv.points > 0
 *     ) AS T2
 *     ON T1.id = T2."likes"
 *     GROUP BY T1.id
 *   ) T
 * ) T
 * WHERE T.id = :bikecheckId
 * ```
 */
export const getRank = new PreparedQuery<IGetRankParams,IGetRankResult>(getRankIR);


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

const findOnSaleIR: any = {"name":"findOnSale","params":[],"usedParamSet":{},"statement":{"body":"SELECT *\nFROM \"Bikecheck\"\nWHERE \"onSale\" = TRUE and \"isActive\" = TRUE\nORDER BY \"saleRank\" DESC","loc":{"a":1348,"b":1441,"line":61,"col":0}}};

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


/** 'FindTopBikecheck' parameters type */
export type IFindTopBikecheckParams = void;

/** 'FindTopBikecheck' return type */
export interface IFindTopBikecheckResult {
  count: string | null;
  id: string;
}

/** 'FindTopBikecheck' query type */
export interface IFindTopBikecheckQuery {
  params: IFindTopBikecheckParams;
  result: IFindTopBikecheckResult;
}

const findTopBikecheckIR: any = {"name":"findTopBikecheck","params":[],"usedParamSet":{},"statement":{"body":"SELECT \"id\", COUNT(\"bikecheckId\")\nFROM\n  (\n    SELECT * FROM \"Bikecheck\" b WHERE b.\"isActive\" = TRUE\n  ) AS T1\n  LEFT JOIN\n  (\n    SELECT \"bikecheckId\" FROM \"BikecheckVote\" bv WHERE bv.\"points\"  > 0\n  ) AS T2\n  ON T1.id = T2.\"bikecheckId\"\nGROUP BY T1.\"id\"\nORDER BY \"count\" DESC\nLIMIT 10","loc":{"a":1474,"b":1759,"line":67,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT "id", COUNT("bikecheckId")
 * FROM
 *   (
 *     SELECT * FROM "Bikecheck" b WHERE b."isActive" = TRUE
 *   ) AS T1
 *   LEFT JOIN
 *   (
 *     SELECT "bikecheckId" FROM "BikecheckVote" bv WHERE bv."points"  > 0
 *   ) AS T2
 *   ON T1.id = T2."bikecheckId"
 * GROUP BY T1."id"
 * ORDER BY "count" DESC
 * LIMIT 10
 * ```
 */
export const findTopBikecheck = new PreparedQuery<IFindTopBikecheckParams,IFindTopBikecheckResult>(findTopBikecheckIR);


