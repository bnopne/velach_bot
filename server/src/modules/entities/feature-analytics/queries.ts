/** Types generated for queries found in "src/modules/entities/feature-analytics/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'Insert' parameters type */
export interface IInsertParams {
  chatId?: NumberOrString | null | void;
  featureKey?: number | null | void;
  userId?: NumberOrString | null | void;
}

/** 'Insert' return type */
export interface IInsertResult {
  chatId: string;
  createdAt: Date;
  featureKey: number;
  id: string;
  userId: string;
}

/** 'Insert' query type */
export interface IInsertQuery {
  params: IInsertParams;
  result: IInsertResult;
}

const insertIR: any = {"usedParamSet":{"featureKey":true,"chatId":true,"userId":true},"params":[{"name":"featureKey","required":false,"transform":{"type":"scalar"},"locs":[{"a":74,"b":84}]},{"name":"chatId","required":false,"transform":{"type":"scalar"},"locs":[{"a":87,"b":93}]},{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":96,"b":102}]}],"statement":"INSERT INTO \"FeatureAnalytics\" (\"featureKey\", \"chatId\", \"userId\")\nVALUES (:featureKey, :chatId, :userId)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "FeatureAnalytics" ("featureKey", "chatId", "userId")
 * VALUES (:featureKey, :chatId, :userId)
 * RETURNING *
 * ```
 */
export const insert = new PreparedQuery<IInsertParams,IInsertResult>(insertIR);


