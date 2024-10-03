/** Types generated for queries found in "src/modules/entities/bot-admin/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'FindByUserId' parameters type */
export interface IFindByUserIdParams {
  userId: string | null | void;
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

const findByUserIdIR: any = {"name":"findByUserId","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":71,"b":76,"line":4,"col":18}]}}],"usedParamSet":{"userId":true},"statement":{"body":"SELECT *\r\nFROM \"BotAdmin\"\r\nWHERE \"userId\" = :userId","loc":{"a":26,"b":76,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "BotAdmin"
 * WHERE "userId" = :userId
 * ```
 */
export const findByUserId = new PreparedQuery<IFindByUserIdParams,IFindByUserIdResult>(findByUserIdIR);


