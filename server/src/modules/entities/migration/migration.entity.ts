import { BaseEntity } from 'src/common/database/base-entity';

export type TTableRow = {
  id: string;
  name: string;
  createdAt: Date;
};

export type TConstructorParams = {
  id: string;
  name: string;
  createdAt: Date;
};

export class Migration extends BaseEntity {
  id: string;
  name: string;
  createdAt: Date;

  static fromTableRow(row: TTableRow): Migration {
    return new Migration({
      id: row.id,
      name: row.name,
      createdAt: row.createdAt,
    });
  }

  constructor(params: TConstructorParams) {
    super();

    this.id = params.id;
    this.name = params.name;
    this.createdAt = params.createdAt;
  }
}
