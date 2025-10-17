import { Body, Controller, Get, Param, Post, Req, Res, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorageConfig } from '../files/upload.util';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('submissions')
@Controller('submissions')
export class SubmissionsController {
  constructor(private submissions: SubmissionsService) {}

  // Public submit by publicId
  @Post('public/:publicId')
  @UseGuards(ThrottlerGuard)
  @Throttle({ short: { limit: 10, ttl: 60 } })
  @UseInterceptors(AnyFilesInterceptor({ storage: diskStorageConfig() }))
  async submit(@Param('publicId') publicId: string, @Body() body: any, @UploadedFiles() files: Array<Express.Multer.File>) {
    const fileMap: Record<string, string> = {};
    for (const f of files || []) {
      fileMap[f.fieldname] = f.path;
    }
    return this.submissions.submit(publicId, body, fileMap);
  }

  @UseGuards(JwtAuthGuard)
  @Get('form/:formId')
  async list(@Req() req: any, @Param('formId') formId: string) {
    return this.submissions.listByForm(formId, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('export/:formId/:type')
  async export(@Req() req: any, @Param('formId') formId: string, @Param('type') type: 'csv' | 'json', @Res() res: Response) {
    const data = await this.submissions.export(formId, req.user.sub, type);
    if (type === 'json') {
      res.setHeader('Content-Type', 'application/json');
      return res.send(data);
    }
    res.setHeader('Content-Type', 'text/csv');
    return res.send(data);
  }
}
