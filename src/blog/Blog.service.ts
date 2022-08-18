import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Blog } from './blog.entity';
import { CreateBlogDto } from './dtos/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(Blog) private blogRepo: Repository<Blog>) {}

  async createBlog(body: CreateBlogDto) {
    const blog = this.blogRepo.create(body);
    return await this.blogRepo.save(blog);
  }
  getBlog(id: number) {}
  updateBlog() {}
  deleteBlog(id: number) {}

  searchBlog() {}
}
