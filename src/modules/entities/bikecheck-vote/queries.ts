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

const findByIdIR: any = {"name":"findById","params":[{"name":"id","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":65,"b":66,"line":4,"col":14}]}}],"usedParamSet":{"id":true},"statement":{"body":"SELECT *\nFROM \"BikecheckVote\"\nWHERE \"id\" = :id","loc":{"a":21,"b":66,"line":2,"col":0}}};

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

const getBikecheckLikesCountIR: any = {"name":"getBikecheckLikesCount","params":[{"name":"bikecheckId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":185,"b":195,"line":9,"col":40}]}}],"usedParamSet":{"bikecheckId":true},"statement":{"body":"SELECT COUNT(\"id\")\nFROM \"BikecheckVote\"\nWHERE \"points\" > 0 AND \"bikecheckId\" = :bikecheckId","loc":{"a":105,"b":195,"line":7,"col":0}}};

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

const getBikecheckDislikesCountIR: any = {"name":"getBikecheckDislikesCount","params":[{"name":"bikecheckId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":317,"b":327,"line":14,"col":40}]}}],"usedParamSet":{"bikecheckId":true},"statement":{"body":"SELECT COUNT(\"id\")\nFROM \"BikecheckVote\"\nWHERE \"points\" < 0 AND \"bikecheckId\" = :bikecheckId","loc":{"a":237,"b":327,"line":12,"col":0}}};

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

const selectByUserAndBikecheckIR: any = {"name":"selectByUserAndBikecheck","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":416,"b":421,"line":19,"col":18}]}},{"name":"bikecheckId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":444,"b":454,"line":19,"col":46}]}}],"usedParamSet":{"userId":true,"bikecheckId":true},"statement":{"body":"SELECT *\nFROM \"BikecheckVote\"\nWHERE \"userId\" = :userId AND \"bikecheckId\" = :bikecheckId","loc":{"a":368,"b":454,"line":17,"col":0}}};

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

const insertIR: any = {"name":"insert","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":576,"b":581,"line":23,"col":9}]}},{"name":"bikecheckId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":585,"b":595,"line":23,"col":18}]}},{"name":"points","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":599,"b":604,"line":23,"col":32}]}}],"usedParamSet":{"userId":true,"bikecheckId":true,"points":true},"statement":{"body":"INSERT INTO \"BikecheckVote\" (\"userId\", \"bikecheckId\", \"points\", \"createdAt\", \"updatedAt\")\nVALUES (:userId, :bikecheckId, :points, NOW(), NOW())\nRETURNING *","loc":{"a":477,"b":631,"line":22,"col":0}}};

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

const updateIR: any = {"name":"update","params":[{"name":"points","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":693,"b":698,"line":28,"col":16}]}},{"name":"bikecheckVoteId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":735,"b":749,"line":29,"col":14}]}}],"usedParamSet":{"points":true,"bikecheckVoteId":true},"statement":{"body":"UPDATE \"BikecheckVote\"\nSET \"points\" = :points, \"updatedAt\" = NOW()\nWHERE \"id\" = :bikecheckVoteId\nRETURNING *","loc":{"a":654,"b":761,"line":27,"col":0}}};

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


