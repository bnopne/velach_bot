import { BaseEntity } from 'src/common/database/base-entity';

type TTableRow = {
  userId: string;
};

type TConstructorParams = TTableRow;

export class Admin extends BaseEntity {
  userId: string;

  static fromTableRow(row: TTableRow): Admin {
    return new Admin(row);
  }

  constructor(params: TConstructorParams) {
    super();

    this.userId = params.userId;
  }
}
