import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { FacilityPhotosService } from 'src/service/hotel/facility_photos.service';
import { FacilityPhotos } from 'entities/FacilityPhotos';

@Controller('facility-photos')
export class FacilityPhotosController {
    constructor(private readonly faphoService:FacilityPhotosService){}

    @Get('view')
    findAllFaciPhotos(){
        return this.faphoService.findAllFaciPhotos()
    }

    @Post('insert')
    async createFaciPhotos(@Body() data: FacilityPhotos){
        const hotel = await this.faphoService.createFaciPhotos(data)
        if (!hotel) {
             return 'failed insert to hotels'
        } else {
            return 'success insert to hotel'
        }
    }

    @Put(':id')
    async updateFacilityPhotos(@Param('id') id:string, @Body() body:any){
        const newData: any = await this.faphoService.updateFacilityPhotos(id,body)
        if (!newData) {
            return "dont updated"
        } else {
            return "updated"
        }
    }

    @Get('viewByFaphoId')
    findByname(@Param() Params){
        return this.faphoService.findByFaphoId(Params)
    }
}
