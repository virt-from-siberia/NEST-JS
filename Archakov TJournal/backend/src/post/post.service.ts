import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
  ) {}

  create(dto: CreatePostDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const fined = await this.repository.findOne(+id);
    if (!fined) throw new NotFoundException('post hot found');
    return fined;
  }

  async update(id: number, dto: UpdatePostDto) {
    const fined = await this.repository.findOne(+id);
    if (!fined) throw new NotFoundException('hot found');
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    const fined = await this.repository.findOne(+id);
    if (!fined) throw new NotFoundException('hot found');
    return this.repository.delete(id);
  }
}
