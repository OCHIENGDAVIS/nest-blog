import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Blog } from './blog.entity';
import { User } from 'src/auth/User.entity';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { UpdateBlogDto } from './dtos/update-blog.dto';
import { BlogSearchQuery } from './dtos/blog-search-query.dto';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(Blog) private blogRepo: Repository<Blog>) {}

  async getAllBlogs() {
    return await this.blogRepo.find({ relations: ['user'] });
  }

  async createBlog(body: CreateBlogDto, user: User) {
    const blog = this.blogRepo.create(body);
    blog.user = user;
    return await this.blogRepo.save(blog);
  }
  async getBlog(id: number) {
    const blog = await this.blogRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!blog) throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    return blog;
  }

  async updateBlog(id: number, body: UpdateBlogDto, user: User) {
    const blog = await this.blogRepo.findOne({
      where: { id },
      relations: ['user'],
    });
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
    if (user.id !== blog.user.id) {
      throw new HttpException(
        'You dant have permission to update, (You are no the owner or the admin user)',
        HttpStatus.FORBIDDEN,
      );
    }
    Object.assign(blog, body);
    return await this.blogRepo.save(blog);
  }
  async deleteBlog(id: number, user: User) {
    const blog = await this.blogRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!blog) {
      throw new HttpException('blog not found', HttpStatus.NOT_FOUND);
    }
    if (user.id !== blog.user.id) {
      throw new HttpException(
        'forbidden: you are not owner or admin user',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.blogRepo.remove(blog);
    return;
  }

  async searchBlog(query: BlogSearchQuery) {
    const { title, content } = query;
    if (title && content) {
      const blogs = await this.blogRepo.find({
        where: {
          title: Like(`%${title}%`),
        },
      });
      return blogs;
    }
  }
}
