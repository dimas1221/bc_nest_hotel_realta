import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { FacilityService } from 'src/service/hotel/facility.service';
import { Facilities } from 'entities/Facilities';
@Controller('facility')
export class FacilityController {
  constructor(private readonly faciService: FacilityService) {}

  @Get('view')
  findAllFacility() {
    return this.faciService.findAllFacility();
  }

  @Get('faciall')
  findallFaciHotel() {
    return this.faciService.findallFaciHotel();
  }

  @Get('maxroomid')
  findMaxRoomId() {
    return this.faciService.findMaxRoomId();
  }

  @Post('insert')
  async createFacilityl(@Body() data: Facilities) {
    const faci = await this.faciService.createFacility(data);
    if (!faci) {
      return 'failed insert to facis';
    } else {
      return 'success insert to faci';
    }
  }

  @Put(':id')
  async updateFacility(@Param('id') id: string, @Body() body: any) {
    const newData: any = await this.faciService.updateFacility(id, body);
    if (!newData) {
      return 'dont updated';
    } else {
      return 'updated';
    }
  }

  @Get('viewByNoRoom')
  findByname(@Param() Params) {
    return this.faciService.findByNoRoom(Params);
  }

  @Delete('delete/:id')
  async deleteFaci(@Param('id') id: any) {
    return this.faciService.deleteFaci(id);
  }
}
