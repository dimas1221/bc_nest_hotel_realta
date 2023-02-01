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
  // insert in table hotel
  async createHotel(data: Hotels): Promise<Hotels> {
    return await this.hotelsRepository.save(this.hotelsRepository.create(data));
  }

  // insert in table hotel2
  // async createHotel(data: Hotels):Promise<Hotels>{
  //     enum ratingHotel{
  //         A=5,
  //         B=4,
  //         C=3,
  //         D=2,
  //     }
  //     let a = ratingHotel.A

  //     if(data.hotelRatingStar !== a) {
  //         console.log('errror')
  //     } else {
  //         const result = await this.hotelsRepository.save(
  //             this.hotelsRepository.create(data)
  //         )
  //         return result;
  //     }
  // }
  //view by hotel name
  async findByName(hotelName: any): Promise<any> {
    return await this.hotelsRepository.findOneBy({ hotelName: hotelName });
  }
  // update
  async updateHotel(id: string, data: Hotels): Promise<any> {
    return this.hotelsRepository
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
}
