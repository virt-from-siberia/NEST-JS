import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/user/decorators/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { UserEntity } from 'src/user/user.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/article.response.interface';

@Controller('articles')
export class ArticleController {
  constructor(
    private readonly articlesService: ArticleService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
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

  @Put()
}
