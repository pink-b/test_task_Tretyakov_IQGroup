import { Table, Column, Model, DataType } from 'sequelize-typescript';

export interface Comment {
  id: number;
  text: string;
  created_at: Date;
  author: string;
}

@Table({ tableName: 'deals', timestamps: false })
export class Deal extends Model<Deal> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['Новый', 'В работе', 'Почти завершен', 'Успешно', 'Провал']],
    },
  })
  status: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at: Date;

  @Column({
    type: DataType.STRING(15),
    allowNull: true,
  })
  phone_number: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  budget: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  full_name: string;

  @Column({
    type: DataType.JSONB,
    defaultValue: [],
  })
  comments: Comment[];
}