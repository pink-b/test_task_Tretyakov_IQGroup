import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Comment } from './comment.model';

@Table
export class Deal extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  status: string;

  @Column
  createdAt: Date;

  @Column
  phoneNumber?: string;

  @Column
  budget?: number;

  @Column
  fullName?: string;

  @HasMany(() => Comment)
  comments: Comment[];
}