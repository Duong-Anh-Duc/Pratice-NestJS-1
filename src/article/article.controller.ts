import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/user/decorator/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { UserEntity } from 'src/user/user.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { IArticleResponse } from './types/articleResponse.interface';
import { IArticlesResponse } from './types/articlesResponse.interface';
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query() query : any) : Promise<IArticlesResponse>{
    return this.articleService.findAll(query)
  }
  @Get(':slug')
  @UseGuards(AuthGuard)
  async getArticle(@Param('slug') slug : string) : Promise<IArticleResponse>{
    const article = await this.articleService.getArticle(slug)
    return this.articleService.generateArticleResponse(article)
  }
  @Post()
  @UseGuards(AuthGuard)
  async createArticle(@User() user : UserEntity, @Body('article') createArticle : CreateArticleDto) : Promise<IArticleResponse>{
    const newArticle = await this.articleService.createArticle(user, createArticle)
    return this.articleService.generateArticleResponse(newArticle)
  }
  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async addToFavoriteArticle(@User() user : UserEntity, @Param('slug') slug : string) : Promise<IArticleResponse>{
      return this.articleService.addToFavoriteArticle(user.id, slug)
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  async updateArticle(@Param('slug') slug : string, @User() user : UserEntity, @Body('article') updateArticleDto : UpdateArticleDto) : Promise<IArticleResponse>{
    const updateArticle = await this.articleService.updateArticle(slug, user.id, updateArticleDto)
    return this.articleService.generateArticleResponse(updateArticle)
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(@Param('slug') slug : string, @User() user : UserEntity){
    return this.articleService.deleteArticle(slug, user.id)
  }
  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  async deleteFromFavoriteArticle(@User() user : UserEntity, @Param('slug') slug : string) : Promise<IArticleResponse>{
    return this.articleService.deleteFromFavoriteArticle(user.id, slug)
}
}
