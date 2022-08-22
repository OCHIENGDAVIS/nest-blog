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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { User } from 'src/auth/User.entity';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { UpdateBlogDto } from './dtos/update-blog.dto';
import { BlogService } from './Blog.service';
import { BlogSearchQuery } from './dtos/blog-search-query.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUserDecorator } from 'src/auth/decorators/current-user.decorator';
import { BlogDto } from './dtos/blog.dto';
import { BlogSerialiazerInterceptor } from './interceptors/blog-serializer.interceptor';

@Controller('blog')
@UseGuards(AuthGuard)
@UseInterceptors(new BlogSerialiazerInterceptor(BlogDto))
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Post('/create')
  async createBlog(
    @Body() body: CreateBlogDto,
    @CurrentUserDecorator() user: User,
  ) {
    return await this.blogService.createBlog(body, user);
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
