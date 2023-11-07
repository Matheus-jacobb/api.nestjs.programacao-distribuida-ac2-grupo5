import { Body, Controller, Delete, Get, Param, Put, Post, ForbiddenException } from '@nestjs/common';
import { CreateRoomPayload } from '../models/create-room.payload';
import { RoomService } from '../services/room.service';
import { UpdateRoomPayload } from '../models/update-room.payload';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoomEntity } from '../entities/room.entity';
import { User } from '../../auth/decorators/user.decorator';
import { UserEntity } from '../../users/entities/user.entity';
import { ProtectRoute } from '../../auth/decorators/protect.decorator';

@ApiBearerAuth()
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
  @ProtectRoute()
  async create(@Body() body: CreateRoomPayload, @User() requestUser: UserEntity) {
    if (requestUser.role !== 'admin')
      throw new ForbiddenException('Você não tem autorização para realizar essa ação');

    return this.usersService.create(body);
  }

  @Put(':id')
  @ApiOkResponse({ type: RoomEntity })
  update(@Param('id') id: string, @Body() body: UpdateRoomPayload, @User() requestUser: UserEntity) {
    if (requestUser.role !== 'admin')
      throw new ForbiddenException('Você não tem autorização para realizar essa ação');

    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RoomEntity })
  remove(@Param('id') id: string, @User() requestUser: UserEntity) {
    if (requestUser.role !== 'admin')
      throw new ForbiddenException('Você não tem autorização para realizar essa ação');

    return this.usersService.remove(id);
  }
}
