import { Expose, Transform } from 'class-transformer';

export class BlogDto {
  @Expose()
  id: number;

  @Expose()
  content: string;

  @Expose()
  published: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
