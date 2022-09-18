import { BaseEntity } from 'src/common/database/base-entity';

export interface IAdminSiteAccessEntityConstructorParams {
  userId: string;
}

export interface IAdminSiteAccessTableRow {
  userId: string;
}

export class AdminSiteAccessEntity extends BaseEntity {
  userId: string;

  static fromTableRow(row: IAdminSiteAccessTableRow): AdminSiteAccessEntity {
    return new AdminSiteAccessEntity(row);
  }

  constructor(params: IAdminSiteAccessEntityConstructorParams) {
    super();

    this.userId = params.userId;
  }
}
