import { BaseEntity } from 'src/common/database/base-entity';

export type TBikecheckVoteConstructorParams = {
  bikecheckId: string;
  createdAt: Date;
  id: string;
  points: number;
  updatedAt: Date;
  userId: string;
};

export type TBikecheckVoteTableRow = {
  bikecheckId: string;
  createdAt: Date;
  id: string;
  points: number;
  updatedAt: Date;
  userId: string;
};

export class BikecheckVote extends BaseEntity {
  bikecheckId: string;
  createdAt: Date;
  id: string;
  points: number;
  updatedAt: Date;
  userId: string;

  static fromTableRow(row: TBikecheckVoteTableRow): BikecheckVote {
    return new BikecheckVote(row);
  }

  constructor(params: TBikecheckVoteConstructorParams) {
    super();

    this.bikecheckId = params.bikecheckId;
    this.createdAt = params.createdAt;
    this.id = params.id;
    this.points = params.points;
    this.updatedAt = params.updatedAt;
    this.userId = params.userId;
  }
}
