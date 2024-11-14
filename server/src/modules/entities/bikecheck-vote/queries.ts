/** Types generated for queries found in "src/modules/entities/bikecheck-vote/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'FindById' parameters type */
export interface IFindByIdParams {
  id: string | null | void;
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

const findByIdIR: any = {
  name: 'findById',
  params: [
    {
      name: 'id',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 68, b: 69, line: 4, col: 14 }] },
    },
  ],
  usedParamSet: { id: true },
  statement: {
    body: 'SELECT *\r\nFROM "BikecheckVote"\r\nWHERE "id" = :id',
    loc: { a: 22, b: 69, line: 2, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "BikecheckVote"
 * WHERE "id" = :id
 * ```
 */
export const findById = new PreparedQuery<IFindByIdParams, IFindByIdResult>(
  findByIdIR,
);

/** 'GetBikecheckLikesCount' parameters type */
export interface IGetBikecheckLikesCountParams {
  bikecheckId: string | null | void;
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

const getBikecheckLikesCountIR: any = {
  name: 'getBikecheckLikesCount',
  params: [
    {
      name: 'bikecheckId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 193, b: 203, line: 9, col: 40 }] },
    },
  ],
  usedParamSet: { bikecheckId: true },
  statement: {
    body: 'SELECT COUNT("id")\r\nFROM "BikecheckVote"\r\nWHERE "points" > 0 AND "bikecheckId" = :bikecheckId',
    loc: { a: 111, b: 203, line: 7, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT("id")
 * FROM "BikecheckVote"
 * WHERE "points" > 0 AND "bikecheckId" = :bikecheckId
 * ```
 */
export const getBikecheckLikesCount = new PreparedQuery<
  IGetBikecheckLikesCountParams,
  IGetBikecheckLikesCountResult
>(getBikecheckLikesCountIR);

/** 'GetBikecheckDislikesCount' parameters type */
export interface IGetBikecheckDislikesCountParams {
  bikecheckId: string | null | void;
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

const getBikecheckDislikesCountIR: any = {
  name: 'getBikecheckDislikesCount',
  params: [
    {
      name: 'bikecheckId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 330, b: 340, line: 14, col: 40 }] },
    },
  ],
  usedParamSet: { bikecheckId: true },
  statement: {
    body: 'SELECT COUNT("id")\r\nFROM "BikecheckVote"\r\nWHERE "points" < 0 AND "bikecheckId" = :bikecheckId',
    loc: { a: 248, b: 340, line: 12, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT("id")
 * FROM "BikecheckVote"
 * WHERE "points" < 0 AND "bikecheckId" = :bikecheckId
 * ```
 */
export const getBikecheckDislikesCount = new PreparedQuery<
  IGetBikecheckDislikesCountParams,
  IGetBikecheckDislikesCountResult
>(getBikecheckDislikesCountIR);

/** 'SelectByUserAndBikecheck' parameters type */
export interface ISelectByUserAndBikecheckParams {
  bikecheckId: string | null | void;
  userId: string | null | void;
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

const selectByUserAndBikecheckIR: any = {
  name: 'selectByUserAndBikecheck',
  params: [
    {
      name: 'userId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 434, b: 439, line: 19, col: 18 }] },
    },
    {
      name: 'bikecheckId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 462, b: 472, line: 19, col: 46 }] },
    },
  ],
  usedParamSet: { userId: true, bikecheckId: true },
  statement: {
    body: 'SELECT *\r\nFROM "BikecheckVote"\r\nWHERE "userId" = :userId AND "bikecheckId" = :bikecheckId',
    loc: { a: 384, b: 472, line: 17, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "BikecheckVote"
 * WHERE "userId" = :userId AND "bikecheckId" = :bikecheckId
 * ```
 */
export const selectByUserAndBikecheck = new PreparedQuery<
  ISelectByUserAndBikecheckParams,
  ISelectByUserAndBikecheckResult
>(selectByUserAndBikecheckIR);

/** 'Insert' parameters type */
export interface IInsertParams {
  bikecheckId: string | null | void;
  points: number | null | void;
  userId: string | null | void;
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

const insertIR: any = {
  name: 'insert',
  params: [
    {
      name: 'userId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 598, b: 603, line: 23, col: 9 }] },
    },
    {
      name: 'bikecheckId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 607, b: 617, line: 23, col: 18 }] },
    },
    {
      name: 'points',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 621, b: 626, line: 23, col: 32 }] },
    },
  ],
  usedParamSet: { userId: true, bikecheckId: true, points: true },
  statement: {
    body: 'INSERT INTO "BikecheckVote" ("userId", "bikecheckId", "points", "createdAt", "updatedAt")\r\nVALUES (:userId, :bikecheckId, :points, NOW(), NOW())\r\nRETURNING *',
    loc: { a: 498, b: 654, line: 22, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "BikecheckVote" ("userId", "bikecheckId", "points", "createdAt", "updatedAt")
 * VALUES (:userId, :bikecheckId, :points, NOW(), NOW())
 * RETURNING *
 * ```
 */
export const insert = new PreparedQuery<IInsertParams, IInsertResult>(insertIR);

/** 'Update' parameters type */
export interface IUpdateParams {
  bikecheckVoteId: string | null | void;
  points: number | null | void;
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

const updateIR: any = {
  name: 'update',
  params: [
    {
      name: 'points',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 720, b: 725, line: 28, col: 16 }] },
    },
    {
      name: 'bikecheckVoteId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 763, b: 777, line: 29, col: 14 }] },
    },
  ],
  usedParamSet: { points: true, bikecheckVoteId: true },
  statement: {
    body: 'UPDATE "BikecheckVote"\r\nSET "points" = :points, "updatedAt" = NOW()\r\nWHERE "id" = :bikecheckVoteId\r\nRETURNING *',
    loc: { a: 680, b: 790, line: 27, col: 0 },
  },
};

/**
 * Query generated from SQL:
 * ```
 * UPDATE "BikecheckVote"
 * SET "points" = :points, "updatedAt" = NOW()
 * WHERE "id" = :bikecheckVoteId
 * RETURNING *
 * ```
 */
export const update = new PreparedQuery<IUpdateParams, IUpdateResult>(updateIR);

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

const findTopBikecheckIR: any = {
  name: 'findTopBikecheck',
  params: [],
  usedParamSet: {},
  statement: {
    body: 'SELECT "id", COUNT("bikecheckId")\r\nFROM\r\n  (\r\n    SELECT * FROM "Bikecheck" b WHERE b."isActive" = TRUE\r\n  ) AS T1\r\n  LEFT JOIN\r\n  (\r\n    SELECT "bikecheckId" FROM "BikecheckVote" bv WHERE bv."points"  > 0\r\n  ) AS T2\r\n  ON T1.id = T2."bikecheckId"\r\nGROUP BY T1."id"\r\nORDER BY "count" DESC\r\nLIMIT 10',
    loc: { a: 826, b: 1123, line: 33, col: 0 },
  },
};

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
export const findTopBikecheck = new PreparedQuery<
  IFindTopBikecheckParams,
  IFindTopBikecheckResult
>(findTopBikecheckIR);

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

const getRankIR: any = {
  name: 'getRank',
  params: [
    {
      name: 'bikecheckId',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 1585, b: 1595, line: 65, col: 14 }] },
    },
  ],
  usedParamSet: { bikecheckId: true },
  statement: {
    body: 'SELECT "rank"\r\nFROM (\r\n  SELECT id, "likes", row_number () over (ORDER BY "likes" desc) AS "rank"\r\n  FROM (\r\n    SELECT id, count("likes") AS "likes"\r\n    FROM\r\n    (\r\n      SELECT id FROM "Bikecheck" b WHERE b."isActive" = TRUE\r\n    ) AS T1\r\n    INNER JOIN\r\n    (\r\n      SELECT "bikecheckId" AS "likes" FROM "BikecheckVote" bv WHERE bv.points > 0\r\n    ) AS T2\r\n    ON T1.id = T2."likes"\r\n    GROUP BY T1.id\r\n  ) T\r\n) T\r\nWHERE T.id = :bikecheckId',
    loc: { a: 1150, b: 1595, line: 48, col: 0 },
  },
};

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
export const getRank = new PreparedQuery<IGetRankParams, IGetRankResult>(
  getRankIR,
);
