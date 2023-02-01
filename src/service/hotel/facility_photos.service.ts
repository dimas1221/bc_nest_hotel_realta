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
    return await this.repositoryFacPhotos.find();
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
}
