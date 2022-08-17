import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  published: boolean;

  @Column({ default: 'NOW()' })
  createedAt: Date;

  @Column({ default: 'NOW()' })
  updatedAt: Date;
}
