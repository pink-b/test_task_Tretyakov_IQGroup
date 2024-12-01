import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Deal } from './deal.model';

@Table({tableName:"comment"})
export class Comment extends Model<Comment> {
  @Column
  text: string;

  @Column
  createdAt: Date;

  @ForeignKey(() => Deal)
  @Column
  dealId: number; 
}