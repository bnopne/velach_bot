/** Types generated for queries found in "src/modules/entities/user/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'FindById' parameters type */
export interface IFindByIdParams {
  id: string | null | void;
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

const findByIdIR: any = {"name":"findById","params":[{"name":"id","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":59,"b":60,"line":4,"col":14}]}}],"usedParamSet":{"id":true},"statement":{"body":"SELECT *\r\nFROM \"User\"\r\nWHERE \"id\" = :id","loc":{"a":22,"b":60,"line":2,"col":0}}};

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
    id: string | null | void,
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

const insertUserIR: any = {"name":"insertUser","params":[{"name":"values","codeRefs":{"defined":{"a":99,"b":104,"line":8,"col":9},"used":[{"a":269,"b":274,"line":11,"col":8}]},"transform":{"type":"pick_array_spread","keys":[{"name":"id","required":false},{"name":"firstName","required":false},{"name":"lastName","required":false},{"name":"username","required":false},{"name":"isBot","required":false},{"name":"stravaLink","required":false}]},"required":false}],"usedParamSet":{"values":true},"statement":{"body":"INSERT INTO \"User\" (\"id\", \"firstName\", \"lastName\", \"username\", \"isBot\", \"stravaLink\")\r\nVALUES :values\r\nRETURNING *","loc":{"a":174,"b":287,"line":10,"col":0}}};

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
  firstName: string | null | void;
  id: string | null | void;
  isBot: boolean | null | void;
  lastName: string | null | void;
  stravaLink: string | null | void;
  username: string | null | void;
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

const updateUserIR: any = {"name":"updateUser","params":[{"name":"firstName","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":358,"b":366,"line":19,"col":17}]}},{"name":"lastName","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":386,"b":393,"line":20,"col":16}]}},{"name":"username","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":413,"b":420,"line":21,"col":16}]}},{"name":"isBot","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":437,"b":441,"line":22,"col":13}]}},{"name":"stravaLink","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":463,"b":472,"line":23,"col":18}]}},{"name":"id","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":489,"b":490,"line":24,"col":14}]}}],"usedParamSet":{"firstName":true,"lastName":true,"username":true,"isBot":true,"stravaLink":true,"id":true},"statement":{"body":"UPDATE \"User\"\r\nSET\r\n  \"firstName\" = :firstName,\r\n  \"lastName\" = :lastName,\r\n  \"username\" = :username,\r\n  \"isBot\" = :isBot,\r\n  \"stravaLink\" = :stravaLink\r\nWHERE \"id\" = :id\r\nRETURNING *","loc":{"a":321,"b":503,"line":17,"col":0}}};

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


