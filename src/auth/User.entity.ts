import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Blog } from 'src/blog/blog.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];
}
