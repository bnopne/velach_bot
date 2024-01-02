/** Types generated for queries found in "src/modules/entities/feature-analytics/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'Insert' parameters type */
export interface IInsertParams {
  chatId?: NumberOrString | null | void;
  feature?: string | null | void;
  userId?: NumberOrString | null | void;
}

/** 'Insert' return type */
export interface IInsertResult {
  chatId: string;
  createdAt: Date;
  feature: string;
  id: string;
  userId: string;
}

/** 'Insert' query type */
export interface IInsertQuery {
  params: IInsertParams;
  result: IInsertResult;
}

const insertIR: any = {"usedParamSet":{"feature":true,"chatId":true,"userId":true},"params":[{"name":"feature","required":false,"transform":{"type":"scalar"},"locs":[{"a":71,"b":78}]},{"name":"chatId","required":false,"transform":{"type":"scalar"},"locs":[{"a":81,"b":87}]},{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":90,"b":96}]}],"statement":"INSERT INTO \"FeatureAnalytics\" (\"feature\", \"chatId\", \"userId\")\nVALUES (:feature, :chatId, :userId)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "FeatureAnalytics" ("feature", "chatId", "userId")
 * VALUES (:feature, :chatId, :userId)
 * RETURNING *
 * ```
 */
export const insert = new PreparedQuery<IInsertParams,IInsertResult>(insertIR);


