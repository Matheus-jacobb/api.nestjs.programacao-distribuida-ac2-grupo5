import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { CreateRoomPayload } from '../models/create-room.payload';
import { RoomService } from '../services/room.service';
import { UpdateRoomPayload } from '../models/update-room.payload';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoomEntity } from '../entities/room.entity';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomController {

  constructor(
    private readonly usersService: RoomService
  ) { }

  @Get()
  @ApiOkResponse({ type: RoomEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: RoomEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: RoomEntity })
  async create(@Body() body: CreateRoomPayload) {
    return this.usersService.create(body);
  }

  @Put(':id')
  @ApiOkResponse({ type: RoomEntity })
  update(@Param('id') id: string, @Body() body: UpdateRoomPayload) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RoomEntity })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
