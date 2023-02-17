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
  // async createFacility(data: Facilities): Promise<Facilities> {
  //   return await this.repositoryFac.save(this.repositoryFac.create(data));
  // }
  // async createFacility(data: Facilities): Promise<Facilities> {
  //   const jsonData = JSON.stringify(data);
  //   return await this.repositoryFac.query(
  //     `CALL hotel.insert_facility_and_price_history(${jsonData})`,
  //   );
  // }
  async insertFacilityAndPriceHistory(
    faciName: string,
    faciDescription: string,
    faciMaxNumber: number,
    faciMeasureUnit: string,
    faciRoomNumber: string,
    faciStartdate: Date,
    faciEndate: Date,
    faciLowPrice: number,
    faciHightPrice: number,
    faciRatePrice: number,
    faciDiscount: number,
    faciTaxRate: number,
    faciModifiedDate: Date,
    faciHotel: number,
    faciCagro: number,
  ): Promise<void> {
    await this.repositoryFac.query(
      `CALL hotel.insert_facility_and_price_history(
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
      )`,
      [
        faciName,
        faciDescription,
        faciMaxNumber,
        faciMeasureUnit,
        faciRoomNumber,
        faciStartdate,
        faciEndate,
        faciLowPrice,
        faciHightPrice,
        faciRatePrice,
        faciDiscount,
        faciTaxRate,
        faciModifiedDate,
        faciHotel,
        faciCagro,
      ],
    );
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

  async deleteFaci(id: any): Promise<any> {
    await this.repositoryFac.delete({ faciId: id });
    return 'berhasil hapus data';
  }
}
