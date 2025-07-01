import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectRepository(TagEntity) private readonly tagRespository : Repository<TagEntity>){

  }
  async getAll(){
    const allTags = await this.tagRespository.find()
    const allTagsName : string[] = allTags.map((tag) => tag.name)
    return allTagsName
  }
  async getTagById(id : number){
    const tags = await this.tagRespository.findOneBy({id})
    if(tags) return {tags}
    return 'Not tag by id'
  }
}
