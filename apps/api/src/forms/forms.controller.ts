import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { FormsService } from './forms.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateFormDto, UpdateFormDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('forms')
@Controller('forms')
export class FormsController {
  constructor(private forms: FormsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Req() req: any) {
    return this.forms.listByOwner(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: any, @Body() body: CreateFormDto) {
    return this.forms.create(req.user.sub, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Req() req: any, @Param('id') id: string) {
    return this.forms.getById(id, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Req() req: any, @Param('id') id: string, @Body() body: UpdateFormDto) {
    return this.forms.update(id, req.user.sub, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Req() req: any, @Param('id') id: string) {
    return this.forms.remove(id, req.user.sub);
  }

  @Get('public/:publicId')
  async getPublic(@Param('publicId') publicId: string) {
    return this.forms.getPublicById(publicId);
  }
}
