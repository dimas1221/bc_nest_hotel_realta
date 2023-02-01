import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'entities/Department';
import { DepartmentController } from 'src/controller/humanresource/department/department.controller';
import { DepartmentService } from 'src/service/humanresource/department/department.service';
import { Hotels } from 'entities/Hotels';
import { HotelService } from 'src/service/hotel/hotel.service';
import { HotelController } from 'src/controller/hotel/hotel.controller';
import { HotelReviewController } from 'src/controller/hotel/hotel_review.controller';
import { HotelReviewService } from 'src/service/hotel/hotel_review.service';
import { HotelReviews } from 'entities/HotelReviews';
import { FacilityPriceHistory } from 'entities/FacilityPriceHistory';
import { FacilityPriceHistoryService } from 'src/service/hotel/facility_price_history.service';
import { FacilityPriceHistoryController } from 'src/controller/hotel/facility_price_history.controller';
import { Facilities } from 'entities/Facilities';
import { FacilityController } from 'src/controller/hotel/facility.controller';
import { FacilityService } from 'src/service/hotel/facility.service';
import { FacilityPhotos } from 'entities/FacilityPhotos';
import { FacilityPhotosController } from 'src/controller/hotel/facility_photos.controller';
import { FacilityPhotosService } from 'src/service/hotel/facility_photos.service';


@Module({
  imports: [TypeOrmModule.forFeature([Department,Hotels,HotelReviews,FacilityPriceHistory,Facilities, FacilityPhotos])],
  controllers: [DepartmentController,HotelController,HotelReviewController, FacilityPriceHistoryController,FacilityController,FacilityPhotosController],
  providers: [DepartmentService, HotelService, HotelReviewService, FacilityPriceHistoryService,FacilityService,FacilityPhotosService],
})
export class GlobalModule {}