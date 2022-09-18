import { BaseEntity } from 'src/common/database/base-entity';

export interface IMigrationTableRow {
  id: string;
  name: string;
  createdAt: Date;
}

export interface IMigrationConstructorParams {
  id: string;
  name: string;
  createdAt: Date;
}

export class Migration extends BaseEntity {
  id: string;
  name: string;
  createdAt: Date;

  static fromTableRow(row: IMigrationTableRow): Migration {
    return new Migration({
      id: row.id,
      name: row.name,
      createdAt: row.createdAt,
    });
  }

  constructor(params: IMigrationConstructorParams) {
    super();

    this.id = params.id;
    this.name = params.name;
    this.createdAt = params.createdAt;
  }
}
