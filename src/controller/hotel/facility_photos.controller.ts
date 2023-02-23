import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FacilityPhotosService } from 'src/service/hotel/facility_photos.service';
import { FacilityPhotos } from 'entities/FacilityPhotos';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';

@Controller('facility-photos')
export class FacilityPhotosController {
  constructor(private readonly faphoService: FacilityPhotosService) {}

  @Get('view')
  findAllFaciPhotos() {
    return this.faphoService.findAllFaciPhotos();
  }

  @Post('insert')
  async createFaciPhotos(@Body() data: FacilityPhotos) {
    const hotel = await this.faphoService.createFaciPhotos(data);
    if (!hotel) {
      return 'failed insert to hotels';
    } else {
      return 'success insert to hotel';
    }
  }

  @Put(':id')
  async updateFacilityPhotos(@Param('id') id: string, @Body() body: any) {
    const newData: any = await this.faphoService.updateFacilityPhotos(id, body);
    if (!newData) {
      return 'dont updated';
    } else {
      return 'updated';
    }
  }

  @Get('viewByFaphoId')
  findByname(@Param() Params) {
    return this.faphoService.findByFaphoId(Params);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'public/upload',
      storage: diskStorage({
        destination: 'public/upload',
        filename(req, file, cb) {
          return cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    const result = await this.faphoService.storeFileInfo(file, body);
    if (!result) {
      return 'gagal upload';
    } else {
      return 'berhasil upload';
    }
  }

  // @Post('upload')
  // @UseInterceptors(
  //   FilesInterceptor('files', 10, {
  //     dest: 'public/upload',
  //     storage: diskStorage({
  //       destination: 'public/upload',
  //       filename(req, file, cb) {
  //         return cb(null, file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // async uploadFiles(
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body() body,
  // ): Promise<{ message: string }> {
  //   await this.faphoService.storeFileInfo(files, body);

  //   return {
  //     message: 'Facility photos have been successfully uploaded.',
  //   };
  // }
}
