import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { Deal } from './deal.model';

@Table
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @ForeignKey(() => Deal)
  @Column
  dealId: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;
}