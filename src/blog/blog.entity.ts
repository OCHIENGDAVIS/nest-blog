import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  published: boolean;
  @Column()
  publshedAt: Date;
  @Column()
  updatedAt: Date;
}
