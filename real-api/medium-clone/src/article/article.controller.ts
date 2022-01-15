import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/user/decorators/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { ArticleService } from './article.service';

import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from 'src/user/user.entity';

import { ArticleResponseInterface } from './types/article.response.interface';
import { ArticlesResponseInterface } from './types/articles.response.interface';

@Controller('articles')
export class ArticleController {
  constructor(
    private readonly articlesService: ArticleService,
  ) {}

  @Get()
  async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articlesService.findAll(
      currentUserId,
      query,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article =
      await this.articlesService.createArticle(
        currentUser,
        createArticleDto,
      );
    return this.articlesService.buildArticleResponse(
      article,
    );
  }

  @Get(':slug')
  async getSingleArticle(
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articlesService.findBySlug(
      slug,
    );
    return this.articlesService.buildArticleResponse(
      article,
    );
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ) {
    return await this.articlesService.deleteArticle(
      slug,
      currentUserId,
    );
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  async updateArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article =
      await this.articlesService.updateArticle(
        slug,
        updateArticleDto,
        currentUserId,
      );

    return this.articlesService.buildArticleResponse(
      article,
    );
  }
}
