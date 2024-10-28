import { Controller, Post, UseInterceptors, UploadedFiles, BadRequestException, Param, ParseUUIDPipe, Body } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { fileFilter } from './helpers';
import { ValidRoles } from '../auth/interfaces';
import { Auth } from '../auth/decorators';

@Controller('upload')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post(':id')
  @UseInterceptors(
    FilesInterceptor('images', 2, {
      fileFilter: fileFilter,
      limits: { fileSize: 128 * 1000 },
    }),
  )
  @Auth(ValidRoles.superUser, ValidRoles.administrator, ValidRoles.user)
  async receiveFileController(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body('urlToDelete') urlToDelete: string,
  ) {
    if (!files) throw new BadRequestException('Make sure that the file is an Image');
    return this.filesService.processImageUser(files, id, urlToDelete);
  }
}
