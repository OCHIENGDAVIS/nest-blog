import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';

import { CreateBlogDto } from './dtos/create-blog.dto';
import { UpdateBlogDto } from './dtos/update-blog.dto';
import { BlogService } from './Blog.service';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('/create')
  async createBlog(@Body() body: CreateBlogDto) {
    return await this.blogService.createBlog(body);
  }

  @Get('/:id')
  async getBlog(@Param('id') id: string) {
    return await this.blogService.getBlog(parseInt(id));
  }

  @Patch('/:id')
  async updateblog(@Param('id') id: string, @Body() body: UpdateBlogDto) {
    return await this.blogService.updateBlog(parseInt(id), body);
  }
}
