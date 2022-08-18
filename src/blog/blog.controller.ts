import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CreateBlogDto } from './dtos/create-blog.dto';
import { UpdateBlogDto } from './dtos/update-blog.dto';
import { BlogService } from './Blog.service';
import { BlogSearchQuery } from './dtos/blog-search-query.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('blog')
@UseGuards(AuthGuard)
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

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

  @Delete('/:id')
  async deleteBlog(@Param('id') id: string) {
    return this.blogService.deleteBlog(parseInt(id));
  }

  @Get('/search/blog')
  async search(@Query() query: BlogSearchQuery) {
    console.log(query);
    return await this.blogService.searchBlog(query);
  }
}
