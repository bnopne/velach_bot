/** Types generated for queries found in "src/modules/entities/user/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'FindById' parameters type */
export interface IFindByIdParams {
  id?: NumberOrString | null | void;
}

/** 'FindById' return type */
export interface IFindByIdResult {
  firstName: string | null;
  id: string;
  isBot: boolean | null;
  lastName: string | null;
  stravaLink: string | null;
  username: string | null;
}

/** 'FindById' query type */
export interface IFindByIdQuery {
  params: IFindByIdParams;
  result: IFindByIdResult;
}

const findByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":34,"b":36}]}],"statement":"SELECT *\nFROM \"User\"\nWHERE \"id\" = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "User"
 * WHERE "id" = :id
 * ```
 */
export const findById = new PreparedQuery<IFindByIdParams,IFindByIdResult>(findByIdIR);


/** 'InsertUser' parameters type */
export interface IInsertUserParams {
  values: readonly ({
    id: NumberOrString | null | void,
    firstName: string | null | void,
    lastName: string | null | void,
    username: string | null | void,
    isBot: boolean | null | void,
    stravaLink: string | null | void
  })[];
}

/** 'InsertUser' return type */
export interface IInsertUserResult {
  firstName: string | null;
  id: string;
  isBot: boolean | null;
  lastName: string | null;
  stravaLink: string | null;
  username: string | null;
}

/** 'InsertUser' query type */
export interface IInsertUserQuery {
  params: IInsertUserParams;
  result: IInsertUserResult;
}

const insertUserIR: any = {"usedParamSet":{"values":true},"params":[{"name":"values","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"id","required":false},{"name":"firstName","required":false},{"name":"lastName","required":false},{"name":"username","required":false},{"name":"isBot","required":false},{"name":"stravaLink","required":false}]},"locs":[{"a":93,"b":99}]}],"statement":"INSERT INTO \"User\" (\"id\", \"firstName\", \"lastName\", \"username\", \"isBot\", \"stravaLink\")\nVALUES :values\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "User" ("id", "firstName", "lastName", "username", "isBot", "stravaLink")
 * VALUES :values
 * RETURNING *
 * ```
 */
export const insertUser = new PreparedQuery<IInsertUserParams,IInsertUserResult>(insertUserIR);


/** 'UpdateUser' parameters type */
export interface IUpdateUserParams {
  firstName?: string | null | void;
  id?: NumberOrString | null | void;
  isBot?: boolean | null | void;
  lastName?: string | null | void;
  stravaLink?: string | null | void;
  username?: string | null | void;
}

/** 'UpdateUser' return type */
export interface IUpdateUserResult {
  firstName: string | null;
  id: string;
  isBot: boolean | null;
  lastName: string | null;
  stravaLink: string | null;
  username: string | null;
}

/** 'UpdateUser' query type */
export interface IUpdateUserQuery {
  params: IUpdateUserParams;
  result: IUpdateUserResult;
}

const updateUserIR: any = {"usedParamSet":{"firstName":true,"lastName":true,"username":true,"isBot":true,"stravaLink":true,"id":true},"params":[{"name":"firstName","required":false,"transform":{"type":"scalar"},"locs":[{"a":34,"b":43}]},{"name":"lastName","required":false,"transform":{"type":"scalar"},"locs":[{"a":61,"b":69}]},{"name":"username","required":false,"transform":{"type":"scalar"},"locs":[{"a":87,"b":95}]},{"name":"isBot","required":false,"transform":{"type":"scalar"},"locs":[{"a":110,"b":115}]},{"name":"stravaLink","required":false,"transform":{"type":"scalar"},"locs":[{"a":135,"b":145}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":160,"b":162}]}],"statement":"UPDATE \"User\"\nSET\n  \"firstName\" = :firstName,\n  \"lastName\" = :lastName,\n  \"username\" = :username,\n  \"isBot\" = :isBot,\n  \"stravaLink\" = :stravaLink\nWHERE \"id\" = :id\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE "User"
 * SET
 *   "firstName" = :firstName,
 *   "lastName" = :lastName,
 *   "username" = :username,
 *   "isBot" = :isBot,
 *   "stravaLink" = :stravaLink
 * WHERE "id" = :id
 * RETURNING *
 * ```
 */
export const updateUser = new PreparedQuery<IUpdateUserParams,IUpdateUserResult>(updateUserIR);


/** 'GetUsersList' parameters type */
export interface IGetUsersListParams {
  limit?: NumberOrString | null | void;
  offset?: NumberOrString | null | void;
  search?: string | null | void;
}

/** 'GetUsersList' return type */
export interface IGetUsersListResult {
  firstName: string | null;
  id: string;
  isBot: boolean | null;
  lastName: string | null;
  stravaLink: string | null;
  username: string | null;
}

/** 'GetUsersList' query type */
export interface IGetUsersListQuery {
  params: IGetUsersListParams;
  result: IGetUsersListResult;
}

const getUsersListIR: any = {"usedParamSet":{"search":true,"limit":true,"offset":true},"params":[{"name":"search","required":false,"transform":{"type":"scalar"},"locs":[{"a":47,"b":53},{"a":77,"b":83},{"a":107,"b":113}]},{"name":"limit","required":false,"transform":{"type":"scalar"},"locs":[{"a":121,"b":126}]},{"name":"offset","required":false,"transform":{"type":"scalar"},"locs":[{"a":135,"b":141}]}],"statement":"SELECT *\nFROM \"User\"\nWHERE\n  \"firstName\" ILIKE :search OR\n  \"lastName\" ILIKE :search OR\n  \"username\" ILIKE :search\nLIMIT :limit\nOFFSET :offset"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "User"
 * WHERE
 *   "firstName" ILIKE :search OR
 *   "lastName" ILIKE :search OR
 *   "username" ILIKE :search
 * LIMIT :limit
 * OFFSET :offset
 * ```
 */
export const getUsersList = new PreparedQuery<IGetUsersListParams,IGetUsersListResult>(getUsersListIR);


/** 'GetCount' parameters type */
export type IGetCountParams = void;

/** 'GetCount' return type */
export interface IGetCountResult {
  count: string | null;
}

/** 'GetCount' query type */
export interface IGetCountQuery {
  params: IGetCountParams;
  result: IGetCountResult;
}

const getCountIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT COUNT(\"id\")\nFROM \"User\""};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT("id")
 * FROM "User"
 * ```
 */
export const getCount = new PreparedQuery<IGetCountParams,IGetCountResult>(getCountIR);


