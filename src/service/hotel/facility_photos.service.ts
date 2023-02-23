import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityPhotos } from 'entities/FacilityPhotos';

@Injectable()
export class FacilityPhotosService {
  constructor(
    @InjectRepository(FacilityPhotos)
    private repositoryFacPhotos: Repository<FacilityPhotos>,
  ) {}

  // find all htels
  async findAllFaciPhotos(): Promise<any> {
    return await this.repositoryFacPhotos.query(
      'select * from hotel.facility_photos',
    );
  }
  // insert in table hotel
  async createFaciPhotos(data: FacilityPhotos): Promise<FacilityPhotos> {
    enum fapho_primary {
      notPrimary = '0',
      primary = '1',
    }
    let nP = fapho_primary.notPrimary;
    let p = fapho_primary.primary;

    if (data.faphoPrimary == nP || data.faphoPrimary == p) {
      return await this.repositoryFacPhotos.save(
        this.repositoryFacPhotos.create(data),
      );
    } else {
      console.log('error');
    }
  }

  // update
  async updateFacilityPhotos(id: string, data: FacilityPhotos): Promise<any> {
    return this.repositoryFacPhotos
      .createQueryBuilder()
      .update()
      .set({
        faphoPhotoFilename: data.faphoPhotoFilename,
      })
      .where('faphoId = :id', { id })
      .execute();
  }

  //view by userid
  async findByFaphoId(faphoId: any): Promise<any> {
    return await this.repositoryFacPhotos.findOneBy({ faphoId: faphoId });
  }

  // upload photo
  async storeFileInfo(
    file: { filename: string; originalname: string },
    body: any,
  ) {
    const fileInfo = new FacilityPhotos();

    fileInfo.faphoUrl = `public/uploads/${file.originalname}`;
    fileInfo.faphoPhotoFilename = file.filename;
    fileInfo.faphoModifieldDate = new Date();
    fileInfo.faphoThumbnailFilename = `tumb ${file.filename}`;
    fileInfo.faphoFaci = body.faphoFaci;

    return await this.repositoryFacPhotos.save(fileInfo);
  }

  // async storeFileInfo(
  //   files: Express.Multer.File[], // ubah parameter file menjadi files dengan tipe array of Express.Multer.File
  //   body: any,
  // ) {
  //   const facilityPhotos: FacilityPhotos[] = [];
  //   const promises = [];

  //   for (const file of files) {
  //     const fileInfo = new FacilityPhotos();
  //     fileInfo.faphoUrl = `public/uploads/${file.originalname}`;
  //     fileInfo.faphoPhotoFilename = file.filename;
  //     fileInfo.faphoModifieldDate = new Date();
  //     fileInfo.faphoThumbnailFilename = `tumb ${file.filename}`;
  //     fileInfo.faphoPrimary = body.faphoPrimary;
  //     fileInfo.faphoFaci = body.faphoFaci;
  //     facilityPhotos.push(fileInfo);

  //     promises.push(this.repositoryFacPhotos.save(fileInfo));
  //   }

  //   await Promise.all(promises); // menjalankan semua promises pada satu waktu

  //   return facilityPhotos; // mengembalikan array facilityPhotos
  // }
}
