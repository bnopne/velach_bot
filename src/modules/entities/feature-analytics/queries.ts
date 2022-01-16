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

const insertIR: any = {"name":"insert","params":[{"name":"feature","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":91,"b":97,"line":3,"col":9}]}},{"name":"chatId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":101,"b":106,"line":3,"col":19}]}},{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":110,"b":115,"line":3,"col":28}]}}],"usedParamSet":{"feature":true,"chatId":true,"userId":true},"statement":{"body":"INSERT INTO \"FeatureAnalytics\" (\"feature\", \"chatId\", \"userId\")\nVALUES (:feature, :chatId, :userId)\nRETURNING *","loc":{"a":19,"b":128,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "FeatureAnalytics" ("feature", "chatId", "userId")
 * VALUES (:feature, :chatId, :userId)
 * RETURNING *
 * ```
 */
export const insert = new PreparedQuery<IInsertParams,IInsertResult>(insertIR);


