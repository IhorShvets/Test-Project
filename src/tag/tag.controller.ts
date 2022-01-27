import { Controller, Get, Param, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagEntity } from './tag.entity';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<{ tags: string[] }> {
    const tags = await this.tagService.findAll();
    return {
      tags: tags.map((tag) => tag.name),
    };
  }

  @Post(':tagName')
  async createTag(@Param() params): Promise<TagEntity> {
    return this.tagService.createTag(params.tagName);
  }
}
