/** Types generated for queries found in "src/modules/entities/admin/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'FindByUserId' parameters type */
export interface IFindByUserIdParams {
  userId?: NumberOrString | null | void;
}

/** 'FindByUserId' return type */
export interface IFindByUserIdResult {
  userId: string;
}

/** 'FindByUserId' query type */
export interface IFindByUserIdQuery {
  params: IFindByUserIdParams;
  result: IFindByUserIdResult;
}

const findByUserIdIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":39,"b":45}]}],"statement":"SELECT *\nFROM \"Admin\"\nWHERE \"userId\" = :userId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "Admin"
 * WHERE "userId" = :userId
 * ```
 */
export const findByUserId = new PreparedQuery<IFindByUserIdParams,IFindByUserIdResult>(findByUserIdIR);


