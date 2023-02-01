import { Body, Controller, Delete, Get, Param, Post, Put, Req ,Res, Next} from '@nestjs/common';
import { HotelService } from 'src/service/hotel/hotel.service';
import { Hotels } from 'entities/Hotels';
@Controller('hotel')
export class HotelController {
    constructor(private readonly hotelService:HotelService){}

    @Get('view')
    findAllHotel(){
        return this.hotelService.findAllHotel()
    }

    @Get('viewByName')
    findByname(@Param() Params){
        return this.hotelService.findByName(Params)
    }

    @Post('insert')
    async createHotel(@Body() data: Hotels){
        const hotel = await this.hotelService.createHotel(data)
        if (!hotel) {
             return 'failed insert to hotels'
        } else {
            return 'success insert to hotel'
        }
    }

    @Put(':id')
    async updateHotel(@Param('id') id:string, @Body() body:any){
        const newData: any = await this.hotelService.updateHotel(id,body)
        if (!newData) {
            return "customer dont updated"
        } else {
            return "customer updated"
        }
    }
    @Delete('delete/:id')
    async deleteHotel(@Param('id') id: any){
        return this.hotelService.deleteHotels(id)
    }
}
