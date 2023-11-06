import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { CreateHotelPayload } from "../models/create-hotel.payload";
import { HotelsService } from '../services/hotels.service';
import { UpdateHotelsPayload } from '../models/update-hotels.payload';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HotelEntity } from '../entities/hotel.entity';

@ApiTags('Hotels')
@Controller('hotels')
export class HotelsController {

  constructor(
    private readonly usersService: HotelsService
  ) { }

  @Get()
  @ApiOkResponse({ type: HotelEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: HotelEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: HotelEntity })
  async create(@Body() body: CreateHotelPayload) {
    return this.usersService.create(body);
  }

  @Put(':id')
  @ApiOkResponse({ type: HotelEntity })
  update(@Param('id') id: string, @Body() body: UpdateHotelsPayload) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOkResponse({ type: HotelEntity })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
