import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';
import { UserTurismoService } from '../services/user-turismo.service';
import { UserTurismoEntity } from '../entities/user-turismo.entity';
import { CreateUserTurismoPayload } from '../models/create-user-turismo.payload';
import { UpdateUserTurismoPayload } from '../models/update-user-turismo.payload';

@ApiBearerAuth()
@ApiTags('User Turismo')
@Controller('user-turismo')
export class UserTurismoController {

  constructor(
    private readonly service: UserTurismoService
  ) { }

  @Get()
  @ApiOkResponse({ type: UserTurismoEntity, isArray: true })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserTurismoEntity })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: UserTurismoEntity })
  async create(@Body() body: CreateUserTurismoPayload){
    return this.service.create(body);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserTurismoEntity })
  update(@Param('id') id: number, @Body() body: UpdateUserTurismoPayload) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserTurismoEntity })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
