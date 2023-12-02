import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';
import { TurismoService } from '../services/turismo.service';
import { TurismoEntity } from '../entities/turismo.entity';
import { CreateTurismoPayload } from '../models/create-turismo.payload';
import { UpdateTurismoPayload } from '../models/update-turismo.payload';
import { User } from '../../auth/decorators/user.decorator';

@ApiBearerAuth()
@ApiTags('Turismo')
@Controller('turismo')
export class TurismoController {

  constructor(
    private readonly service: TurismoService
  ) { }

  @Get()
  @ApiOkResponse({ type: TurismoEntity, isArray: true })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TurismoEntity })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: TurismoEntity })
  async create(@Body() body: CreateTurismoPayload) {
    return this.service.create(body);
  }

  @Put(':id')
  @ApiOkResponse({ type: TurismoEntity })
  update(@Param('id') id: number, @Body() body: UpdateTurismoPayload, @User() requestUser: UserEntity) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TurismoEntity })
  remove(@Param('id') id: number, @User() requestUser: UserEntity) {
    return this.service.remove(id);
  }
}
