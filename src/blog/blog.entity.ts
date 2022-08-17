import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  published: boolean;

  @Column({ default: new Date() })
  createedAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;
}
