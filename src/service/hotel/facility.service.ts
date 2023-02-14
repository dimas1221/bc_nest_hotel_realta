import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from 'entities/Facilities';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facilities)
    private repositoryFac: Repository<Facilities>,
  ) {}

  // find all htels
  async findAllFacility(): Promise<any> {
    return await this.repositoryFac.query('select * from hotel.facilities');
  }
  // prosedur get all faci hotel with photo
  async findallFaciHotel() {
    return await this.repositoryFac.query('select * from hotel.faci_allhotel');
  }
  // insert in table hotel
  async createFacility(data: Facilities): Promise<Facilities> {
    // enum faci_measure_unit {
    //   p = 'people',
    //   b = 'beds',
    // }
    // let people = faci_measure_unit.p;
    // let beds = faci_measure_unit.b;

    // if (data.faciMeasureUnit == people || data.faciMeasureUnit == beds) {
    //   return await this.repositoryFac.save(this.repositoryFac.create(data));
    // } else {
    //   console.log('error');
    // }
    return await this.repositoryFac.save(this.repositoryFac.create(data));
  }

  // update
  async updateFacility(id: string, data: Facilities): Promise<any> {
    return this.repositoryFac
      .createQueryBuilder()
      .update()
      .set({
        faciDescription: data.faciDescription,
      })
      .where('faciId = :id', { id })
      .execute();
  }

  //view by userid
  async findByNoRoom(faciRoomNumber: any): Promise<any> {
    return await this.repositoryFac.findOneBy({
      faciRoomNumber: faciRoomNumber,
    });
  }

  // nilai max dari faci room
  async findMaxRoomId() {
    return await this.repositoryFac.query(
      'select faci_cagro_id, max(faci_room_number) as max_roomid from hotel.facilities group by faci_cagro_id',
    );
  }
}
