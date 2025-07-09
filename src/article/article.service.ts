import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { IArticleResponse } from './types/articleResponse.interface';
import { IArticlesResponse } from './types/articlesResponse.interface';
@Injectable()
export class ArticleService {
  constructor(@InjectRepository(ArticleEntity) private readonly articleRepository : Repository<ArticleEntity>,
              @InjectRepository(UserEntity) private readonly userRepository : Repository<UserEntity>){}
  async findAll(query : any) : Promise<IArticlesResponse>{
    const queryBuilder = this.articleRepository
    .createQueryBuilder('articles')
    .leftJoinAndSelect('articles.author', 'author')
    if(query.tag){
      queryBuilder.andWhere('articles.tagList LIKE :tag', {
        tag : `%${query.tag}`
      })
    }
    if(query.author){
      const author = await this.userRepository.findOne({
        where : {
          username : query.author,
        }
      })
      if(author){
        queryBuilder.andWhere('articles.authorId = :id', {
          id : author?.id
        })
      }
      else{
        return {articles : [], articlesCount : 0}
      }
    }
    queryBuilder.orderBy('articles.createdAt', 'DESC')
    const articlesCount = await queryBuilder.getCount()
    if(query.limit){
      queryBuilder.limit(query.limit)
    }
    if(query.offset){
      queryBuilder.offset(query.offset)
    }
    const articles = await queryBuilder.getMany()
    return {articles, articlesCount}
  }
  async createArticle(user : UserEntity, createArticle : CreateArticleDto){
    const article = new ArticleEntity()

    Object.assign(article, createArticle)
    if(!article.tagList){
      article.tagList = []
    }
    article.slug = this.generateSlug(createArticle.title)
    article.author = user
    return this.articleRepository.save(article)
  }
  async getArticle(slug : string){
    const article = await this.findArticleBySlug(slug)
    if(!article) {
      throw new HttpException(`Không tồn tại bài đăng cần xoá`, HttpStatus.NOT_FOUND)
    }
    return article
  }
  async addToFavoriteArticle(currentUserId : number, slug : string):Promise<IArticleResponse>{
    const user = await this.userRepository.findOne({
      where : {
       id : currentUserId
      }
    ,
  relations : ['favorites', 'favorites.author', 'articles', 'articles.author']
},)
  if(!user){
    throw new HttpException(`Không tìm thấy người dùng với id ${currentUserId}`, HttpStatus.NOT_FOUND)
  }
  const currentAricle = await this.findArticleBySlug(slug)
  if (!currentAricle) {
    throw new HttpException('Không tìm thấy bài đăng tương ứng!', HttpStatus.NOT_FOUND)
  }
  const isChecked = user?.favorites.some((article) => article.slug === currentAricle.slug)
  if(!isChecked){
    user?.favorites.push(currentAricle)
    currentAricle.favoritesCount = currentAricle.favoritesCount + 1
    await this.userRepository.save(user as UserEntity)
    await this.articleRepository.save(currentAricle)
  }
  return this.generateArticleResponse(currentAricle)
}
  async updateArticle(slug : string, currentUserId : number, updateArticleDto : UpdateArticleDto){
    const article = await this.findArticleBySlug(slug)
    if(!article){
       throw new HttpException(`Không tìm thấy bài đăng!`, HttpStatus.NOT_FOUND)
    }
     if(article.author.id !== currentUserId){
      throw new HttpException('Bạn không có quyền sửa bài đăng này!', HttpStatus.FORBIDDEN)
     }
     if(updateArticleDto.title){
      article.slug =  this.generateSlug(updateArticleDto.title)
     }
     Object.assign(article, updateArticleDto)
     return this.articleRepository.save(article)
    }
  async deleteArticle(slug : string, currentUserId : number ){
    const article = await this.findArticleBySlug(slug)
    if(!article){
       throw new HttpException(`Không tìm thấy bài đăng!`, HttpStatus.NOT_FOUND)
    }
     if(article.author.id !== currentUserId){
      throw new HttpException('Bạn không có quyền xoá bài đăng này!', HttpStatus.FORBIDDEN)
     }
     return this.articleRepository.delete({slug : slug})
  }
    async findArticleBySlug(slug : string){
    return this.articleRepository.findOne({where : {
      slug : slug,
      
    },
    relations : ['author', 'author.favorites', 'author.articles']
  })
  }
  async deleteFromFavoriteArticle(currentUserId : number, slug : string) : Promise<IArticleResponse>{
    const user = await this.userRepository.findOne({
      where : {
       id : currentUserId
      }
    ,  relations : ['favorites', 'favorites.author', 'articles', 'articles.author']
},)
    if(!user){
      throw new HttpException(`Không tìm thấy người dùng với id ${currentUserId}`, HttpStatus.NOT_FOUND)
    }
    const currentAricle = await this.findArticleBySlug(slug)
    if (!currentAricle) {
      throw new HttpException('Không tìm thấy bài đăng tương ứng!', HttpStatus.NOT_FOUND)
    }
    const isChecked = user?.favorites.some((article) => article.slug === currentAricle.slug)
    if(isChecked){
      user.favorites = user.favorites.filter((article) => article.slug !== currentAricle.slug)    
      currentAricle.favoritesCount = currentAricle.favoritesCount - 1 
      await this.userRepository.save(user as UserEntity)
      await this.articleRepository.save(currentAricle)  
    }
    return this.generateArticleResponse(currentAricle) 
  }


  

  // Generate a unique slug for the article
  // The slug is a URL-friendly version of the title with a unique identifier
  generateSlug(title : string) : string {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
    return `${slugify(title, {lower : true})}-${id}`

  }
  generateArticleResponse(article : ArticleEntity) : IArticleResponse{
    return{
      article
    }
  }
}
