import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Blog } from './blog.entity';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { UpdateBlogDto } from './dtos/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(Blog) private blogRepo: Repository<Blog>) {}

  async createBlog(body: CreateBlogDto) {
    const blog = this.blogRepo.create(body);
    return await this.blogRepo.save(blog);
  }
  async getBlog(id: number) {
    const blog = await this.blogRepo.findOne({ where: { id } });
    if (!blog) throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    return blog;
  }

  async updateBlog(id: number, body: UpdateBlogDto) {
    const blog = await this.blogRepo.findOne({ where: { id } });
    if (!blog) {
      throw new HttpException('blog not found', HttpStatus.NOT_FOUND);
    }
    const emptyBody = Object.keys(body).length === 0;
    if (emptyBody) {
      throw new HttpException(
        'empty body: you can update a title, a content or both',
        HttpStatus.BAD_REQUEST,
      );
    }
    Object.assign(blog, body);
    return await this.blogRepo.save(blog);
  }
  deleteBlog(id: number) {}

  searchBlog() {}
}