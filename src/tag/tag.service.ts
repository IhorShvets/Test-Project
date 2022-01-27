import { Injectable } from '@nestjs/common';
import { TagEntity } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  public async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }

  public async createTag(tagName: string): Promise<TagEntity> {
    const newTag = new TagEntity();
    newTag.name = tagName;
    return this.tagRepository.create(newTag);
  }
}
