import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { FacilityService } from 'src/service/hotel/facility.service';
import { Facilities } from 'entities/Facilities';
@Controller('facility')
export class FacilityController {
    constructor(private readonly faciService:FacilityService){}

    @Get('view')
    findAllFacility(){
        return this.faciService.findAllFacility()
    }

    @Post('insert')
    async createFacilityl(@Body() data: Facilities){
        const hotel = await this.faciService.createFacility(data)
        if (!hotel) {
             return 'failed insert to hotels'
        } else {
            return 'success insert to hotel'
        }
    }

    @Put(':id')
    async updateFacility(@Param('id') id:string, @Body() body:any){
        const newData: any = await this.faciService.updateFacility(id,body)
        if (!newData) {
            return "dont updated"
        } else {
            return "updated"
        }
    }

    @Get('viewByNoRoom')
    findByname(@Param() Params){
        return this.faciService.findByNoRoom(Params)
    }
}
