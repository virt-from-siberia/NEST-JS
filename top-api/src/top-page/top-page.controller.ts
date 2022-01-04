import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FindTopPageDto } from './dto/FindTopPage.dto';
import { TopPageModel } from './top-page.model';

@Controller('top-page')
export class TopPageController {
  constructor() {}

  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {}

  @Get(':id')
  async get(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() dto: TopPageModel,
  ) {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {}
}
