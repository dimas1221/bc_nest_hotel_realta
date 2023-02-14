import { Injectable } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotels } from 'entities/Hotels';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotels)
    private hotelsRepository: Repository<Hotels>,
  ) {}
  // find all htels
  async findAllHotel(): Promise<any> {
    return await this.hotelsRepository.find();
  }
  // find address
  async findAddress() {
    return await this.hotelsRepository.query('select * from hotel.address');
  }
  // insert in table hotel
  async createHotel(data: Hotels): Promise<Hotels> {
    return await this.hotelsRepository.save(this.hotelsRepository.create(data));
  }

  //view by hotel name
  async findById(id: any): Promise<any> {
    return await this.hotelsRepository.findOneBy({ hotelId: id });
  }
  // update
  async updateHotel(id: any, data: Hotels): Promise<any> {
    return await this.hotelsRepository
      .createQueryBuilder()
      .update()
      .set({
        hotelName: data.hotelName,
        hotelDescription: data.hotelDescription,
        hotelRatingStar: data.hotelRatingStar,
        hotelPhonenumber: data.hotelPhonenumber,
        hotelModifiedDate: data.hotelModifiedDate,
        hotelAddr: data.hotelAddr,
      })
      .where('hotelId = :id', { id })
      .execute();
  }

  // delete
  async deleteHotels(id: any): Promise<any> {
    await this.hotelsRepository.delete({ hotelId: id });
    return 'berhasil hapus data';
  }

  // prosedur
  async findProcedure() {
    return await this.hotelsRepository.query('SELECT * FROM hotel.card_hotel');
  }

  // review user
  // async reviewHotel(id: any) {
  //   return await this.hotelsRepository.query(
  //     'select * from hotel.get_review($1)',
  //     [id],
  //   );
  // }

  // get card by id
  // async getIdCard(id: number) {
  //   const inputValue = typeof id === undefined ? id : 0;
  //   return await this.hotelsRepository.query(
  //     'select * from hotel.get_cardid($1)',
  //     [inputValue],
  //   );
  // }
}
