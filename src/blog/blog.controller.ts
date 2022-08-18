import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { CreateBlogDto } from './dtos/create-blog.dto';
import { BlogService } from './Blog.service';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('/create')
  async createBlog(@Body() body: CreateBlogDto) {
    return await this.blogService.createBlog(body);
  }
}
