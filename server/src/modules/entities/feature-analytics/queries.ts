/** Types generated for queries found in "src/modules/entities/feature-analytics/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'Insert' parameters type */
export interface IInsertParams {
  chatId: string | null | void;
  feature: string | null | void;
  userId: string | null | void;
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

const insertIR: any = {"name":"insert","params":[{"name":"feature","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":93,"b":99,"line":3,"col":9}]}},{"name":"chatId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":103,"b":108,"line":3,"col":19}]}},{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":112,"b":117,"line":3,"col":28}]}}],"usedParamSet":{"feature":true,"chatId":true,"userId":true},"statement":{"body":"INSERT INTO \"FeatureAnalytics\" (\"feature\", \"chatId\", \"userId\")\r\nVALUES (:feature, :chatId, :userId)\r\nRETURNING *","loc":{"a":20,"b":131,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "FeatureAnalytics" ("feature", "chatId", "userId")
 * VALUES (:feature, :chatId, :userId)
 * RETURNING *
 * ```
 */
export const insert = new PreparedQuery<IInsertParams,IInsertResult>(insertIR);


