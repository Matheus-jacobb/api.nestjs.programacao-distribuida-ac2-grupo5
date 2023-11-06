import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { CreateReservationPayload } from '../models/create-reservation.payload';
import { ReservationService } from '../services/reservation.service';
import { UpdateReservationPayload } from '../models/update-reservation.payload';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReservationEntity } from '../entities/reservation.entity';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {

  constructor(
    private readonly usersService: ReservationService
  ) { }

  @Get()
  @ApiOkResponse({ type: ReservationEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ReservationEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: ReservationEntity })
  async create(@Body() body: CreateReservationPayload) {
    return this.usersService.create(body);
  }

  @Put(':id')
  @ApiOkResponse({ type: ReservationEntity })
  update(@Param('id') id: string, @Body() body: UpdateReservationPayload) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReservationEntity })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
