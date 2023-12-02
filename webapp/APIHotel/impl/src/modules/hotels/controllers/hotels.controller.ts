import { Body, Controller, Delete, Get, Param, Put, Post, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { CreateHotelPayload } from "../models/create-hotel.payload";
import { HotelsService } from '../services/hotels.service';
import { UpdateHotelsPayload } from '../models/update-hotels.payload';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HotelEntity } from '../entities/hotel.entity';
import { User } from '../../auth/decorators/user.decorator';
import { UserEntity } from '../../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ProtectRoute } from '../../auth/decorators/protect.decorator';

@ApiBearerAuth()
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
  @ProtectRoute()
  async create(@Body() body: CreateHotelPayload, @User() requestUser: UserEntity) {
    if (requestUser.role !== 'admin')
      throw new ForbiddenException('Você não tem autorização para realizar essa ação');

    return this.usersService.create(body, requestUser);
  }

  @Put(':id')
  @ApiOkResponse({ type: HotelEntity })
  @ProtectRoute()
  update(@Param('id') id: string, @Body() body: UpdateHotelsPayload, @User() requestUser: UserEntity) {
    if (requestUser.role !== 'admin')
      throw new ForbiddenException('Você não tem autorização para realizar essa ação');

    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOkResponse({ type: HotelEntity })
  @ProtectRoute()
  remove(@Param('id') id: string, @User() requestUser: UserEntity) {
    if (requestUser.role !== 'admin')
      throw new ForbiddenException('Você não tem autorização para realizar essa ação');

    return this.usersService.remove(id);
  }
}
