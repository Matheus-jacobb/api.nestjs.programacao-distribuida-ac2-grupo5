import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { UserEntity } from "../entities/user.entity";
import { CreateUserPayload } from '../models/create-user.payload';
import { UserService } from '../services/user.service';
import { UpdateUserPayload } from '../models/update-user.payload';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectRoute } from '../../auth/decorators/protect.decorator';
import { User } from '../../auth/decorators/user.decorator';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UserController {

  constructor(
    private readonly usersService: UserService
  ) { }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ProtectRoute()
  findAll(@User() requestUser: UserEntity) {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  @ProtectRoute()
  findOne(@Param('id') id: string, @User() requestUser: UserEntity) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() body: CreateUserPayload) {
    return this.usersService.create(body);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserEntity })
  @ProtectRoute()
  update(@Param('id') id: string, @Body() body: UpdateUserPayload, @User() requestUser: UserEntity) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  @ProtectRoute()
  remove(@Param('id') id: string, @User() requestUser: UserEntity) {
    return this.usersService.remove(id);
  }
}
