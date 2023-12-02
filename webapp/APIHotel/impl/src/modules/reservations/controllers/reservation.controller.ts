import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProtectRoute } from '../../auth/decorators/protect.decorator';
import { User } from '../../auth/decorators/user.decorator';
import { UserEntity } from '../../users/entities/user.entity';
import { ReservationEntity } from '../entities/reservation.entity';
import { CreateReservationPayload } from '../models/create-reservation.payload';
import { UpdateReservationPayload } from '../models/update-reservation.payload';
import { ReservationService } from '../services/reservation.service';

@ApiBearerAuth()
@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {

  constructor(
    private readonly usersService: ReservationService
  ) { }

  @Get()
  @ApiOkResponse({ type: ReservationEntity, isArray: true })
  @ProtectRoute()
  findAll(@User() requestUser: UserEntity) {
    return this.usersService.findAll(requestUser);
  }

  @Get(':id')
  @ApiOkResponse({ type: ReservationEntity })
  @ProtectRoute()
  findOne(@Param('id') id: string, @User() requestUser: UserEntity) {
    return this.usersService.findOne(id, requestUser);
  }

  @Get('/user/:userId')
  @ApiOkResponse({ type: ReservationEntity, isArray: true })
  @ProtectRoute()
  @ApiParam({ name: 'userId' })
  findByUser(@User() requestUser: UserEntity, @Param('userId') id: string) {
    return this.usersService.findByUser(id, requestUser);
  }

  @Post()
  @ApiCreatedResponse({ type: ReservationEntity })
  @ProtectRoute()
  async create(@Body() body: CreateReservationPayload) {
    return this.usersService.create(body);
  }

  @Put(':id')
  @ApiOkResponse({ type: ReservationEntity })
  @ProtectRoute()
  update(@Param('id') id: string, @Body() body: UpdateReservationPayload) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReservationEntity })
  @ProtectRoute()
  remove(@Param('id') id: string, @User() requestUser: UserEntity) {
    return this.usersService.remove(id, requestUser);
  }
}
