import { Controller, Get, Param } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {

    }
    @Get()
    getAll(){
      return this.tagService.getAll()
    }
    @Get(':id')
    getTagById(@Param('id') id : string){
      return this.tagService.getTagById(+id)
    }
  
}
