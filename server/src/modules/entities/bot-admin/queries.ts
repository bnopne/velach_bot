/** Types generated for queries found in "src/modules/entities/bot-admin/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'FindById' parameters type */
export interface IFindByIdParams {
  userId?: NumberOrString | null | void;
}

/** 'FindById' return type */
export interface IFindByIdResult {
  userId: string;
}

/** 'FindById' query type */
export interface IFindByIdQuery {
  params: IFindByIdParams;
  result: IFindByIdResult;
}

const findByIdIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":42,"b":48}]}],"statement":"SELECT *\nFROM \"BotAdmin\"\nWHERE \"userId\" = :userId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "BotAdmin"
 * WHERE "userId" = :userId
 * ```
 */
export const findById = new PreparedQuery<IFindByIdParams,IFindByIdResult>(findByIdIR);


