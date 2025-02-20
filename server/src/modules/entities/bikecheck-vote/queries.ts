/** Types generated for queries found in "src/modules/entities/bikecheck-vote/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'FindById' parameters type */
export interface IFindByIdParams {
  id?: NumberOrString | null | void;
}

/** 'FindById' return type */
export interface IFindByIdResult {
  bikecheckId: string;
  createdAt: Date;
  id: string;
  points: number;
  updatedAt: Date;
  userId: string;
}

/** 'FindById' query type */
export interface IFindByIdQuery {
  params: IFindByIdParams;
  result: IFindByIdResult;
}

const findByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":43,"b":45}]}],"statement":"SELECT *\nFROM \"BikecheckVote\"\nWHERE \"id\" = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "BikecheckVote"
 * WHERE "id" = :id
 * ```
 */
export const findById = new PreparedQuery<IFindByIdParams,IFindByIdResult>(findByIdIR);


/** 'GetBikecheckLikesCount' parameters type */
export interface IGetBikecheckLikesCountParams {
  bikecheckId?: NumberOrString | null | void;
}

/** 'GetBikecheckLikesCount' return type */
export interface IGetBikecheckLikesCountResult {
  count: string | null;
}

/** 'GetBikecheckLikesCount' query type */
export interface IGetBikecheckLikesCountQuery {
  params: IGetBikecheckLikesCountParams;
  result: IGetBikecheckLikesCountResult;
}

const getBikecheckLikesCountIR: any = {"usedParamSet":{"bikecheckId":true},"params":[{"name":"bikecheckId","required":false,"transform":{"type":"scalar"},"locs":[{"a":79,"b":90}]}],"statement":"SELECT COUNT(\"id\")\nFROM \"BikecheckVote\"\nWHERE \"points\" > 0 AND \"bikecheckId\" = :bikecheckId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT("id")
 * FROM "BikecheckVote"
 * WHERE "points" > 0 AND "bikecheckId" = :bikecheckId
 * ```
 */
export const getBikecheckLikesCount = new PreparedQuery<IGetBikecheckLikesCountParams,IGetBikecheckLikesCountResult>(getBikecheckLikesCountIR);


/** 'GetBikecheckDislikesCount' parameters type */
export interface IGetBikecheckDislikesCountParams {
  bikecheckId?: NumberOrString | null | void;
}

/** 'GetBikecheckDislikesCount' return type */
export interface IGetBikecheckDislikesCountResult {
  count: string | null;
}

/** 'GetBikecheckDislikesCount' query type */
export interface IGetBikecheckDislikesCountQuery {
  params: IGetBikecheckDislikesCountParams;
  result: IGetBikecheckDislikesCountResult;
}

const getBikecheckDislikesCountIR: any = {"usedParamSet":{"bikecheckId":true},"params":[{"name":"bikecheckId","required":false,"transform":{"type":"scalar"},"locs":[{"a":79,"b":90}]}],"statement":"SELECT COUNT(\"id\")\nFROM \"BikecheckVote\"\nWHERE \"points\" < 0 AND \"bikecheckId\" = :bikecheckId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT("id")
 * FROM "BikecheckVote"
 * WHERE "points" < 0 AND "bikecheckId" = :bikecheckId
 * ```
 */
export const getBikecheckDislikesCount = new PreparedQuery<IGetBikecheckDislikesCountParams,IGetBikecheckDislikesCountResult>(getBikecheckDislikesCountIR);


/** 'SelectByUserAndBikecheck' parameters type */
export interface ISelectByUserAndBikecheckParams {
  bikecheckId?: NumberOrString | null | void;
  userId?: NumberOrString | null | void;
}

/** 'SelectByUserAndBikecheck' return type */
export interface ISelectByUserAndBikecheckResult {
  bikecheckId: string;
  createdAt: Date;
  id: string;
  points: number;
  updatedAt: Date;
  userId: string;
}

/** 'SelectByUserAndBikecheck' query type */
export interface ISelectByUserAndBikecheckQuery {
  params: ISelectByUserAndBikecheckParams;
  result: ISelectByUserAndBikecheckResult;
}

const selectByUserAndBikecheckIR: any = {"usedParamSet":{"userId":true,"bikecheckId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":47,"b":53}]},{"name":"bikecheckId","required":false,"transform":{"type":"scalar"},"locs":[{"a":75,"b":86}]}],"statement":"SELECT *\nFROM \"BikecheckVote\"\nWHERE \"userId\" = :userId AND \"bikecheckId\" = :bikecheckId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "BikecheckVote"
 * WHERE "userId" = :userId AND "bikecheckId" = :bikecheckId
 * ```
 */
export const selectByUserAndBikecheck = new PreparedQuery<ISelectByUserAndBikecheckParams,ISelectByUserAndBikecheckResult>(selectByUserAndBikecheckIR);


/** 'Insert' parameters type */
export interface IInsertParams {
  bikecheckId?: NumberOrString | null | void;
  points?: number | null | void;
  userId?: NumberOrString | null | void;
}

/** 'Insert' return type */
export interface IInsertResult {
  bikecheckId: string;
  createdAt: Date;
  id: string;
  points: number;
  updatedAt: Date;
  userId: string;
}

/** 'Insert' query type */
export interface IInsertQuery {
  params: IInsertParams;
  result: IInsertResult;
}

const insertIR: any = {"usedParamSet":{"userId":true,"bikecheckId":true,"points":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":98,"b":104}]},{"name":"bikecheckId","required":false,"transform":{"type":"scalar"},"locs":[{"a":107,"b":118}]},{"name":"points","required":false,"transform":{"type":"scalar"},"locs":[{"a":121,"b":127}]}],"statement":"INSERT INTO \"BikecheckVote\" (\"userId\", \"bikecheckId\", \"points\", \"createdAt\", \"updatedAt\")\nVALUES (:userId, :bikecheckId, :points, NOW(), NOW())\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "BikecheckVote" ("userId", "bikecheckId", "points", "createdAt", "updatedAt")
 * VALUES (:userId, :bikecheckId, :points, NOW(), NOW())
 * RETURNING *
 * ```
 */
export const insert = new PreparedQuery<IInsertParams,IInsertResult>(insertIR);


/** 'Update' parameters type */
export interface IUpdateParams {
  bikecheckVoteId?: NumberOrString | null | void;
  points?: number | null | void;
}

/** 'Update' return type */
export interface IUpdateResult {
  bikecheckId: string;
  createdAt: Date;
  id: string;
  points: number;
  updatedAt: Date;
  userId: string;
}

/** 'Update' query type */
export interface IUpdateQuery {
  params: IUpdateParams;
  result: IUpdateResult;
}

const updateIR: any = {"usedParamSet":{"points":true,"bikecheckVoteId":true},"params":[{"name":"points","required":false,"transform":{"type":"scalar"},"locs":[{"a":38,"b":44}]},{"name":"bikecheckVoteId","required":false,"transform":{"type":"scalar"},"locs":[{"a":80,"b":95}]}],"statement":"UPDATE \"BikecheckVote\"\nSET \"points\" = :points, \"updatedAt\" = NOW()\nWHERE \"id\" = :bikecheckVoteId\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE "BikecheckVote"
 * SET "points" = :points, "updatedAt" = NOW()
 * WHERE "id" = :bikecheckVoteId
 * RETURNING *
 * ```
 */
export const update = new PreparedQuery<IUpdateParams,IUpdateResult>(updateIR);


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

const findTopBikecheckIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT \"id\", COUNT(\"bikecheckId\")\nFROM\n  (\n    SELECT * FROM \"Bikecheck\" b WHERE b.\"isActive\" = TRUE\n  ) AS T1\n  LEFT JOIN\n  (\n    SELECT \"bikecheckId\" FROM \"BikecheckVote\" bv WHERE bv.\"points\"  > 0\n  ) AS T2\n  ON T1.id = T2.\"bikecheckId\"\nGROUP BY T1.\"id\"\nORDER BY \"count\" DESC\nLIMIT 10"};

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


/** 'GetRank' parameters type */
export interface IGetRankParams {
  bikecheckId?: NumberOrString | null | void;
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

const getRankIR: any = {"usedParamSet":{"bikecheckId":true},"params":[{"name":"bikecheckId","required":false,"transform":{"type":"scalar"},"locs":[{"a":417,"b":428}]}],"statement":"SELECT \"rank\"\nFROM (\n  SELECT id, \"likes\", row_number () over (ORDER BY \"likes\" desc) AS \"rank\"\n  FROM (\n    SELECT id, count(\"likes\") AS \"likes\"\n    FROM\n    (\n      SELECT id FROM \"Bikecheck\" b WHERE b.\"isActive\" = TRUE\n    ) AS T1\n    INNER JOIN\n    (\n      SELECT \"bikecheckId\" AS \"likes\" FROM \"BikecheckVote\" bv WHERE bv.points > 0\n    ) AS T2\n    ON T1.id = T2.\"likes\"\n    GROUP BY T1.id\n  ) T\n) T\nWHERE T.id = :bikecheckId"};

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


