import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { UserEntity } from "../entities/user.entity";
import { CreateUserPayload } from '../models/create-user.payload';
import { UserService } from '../services/user.service';
import { UpdateUserPayload } from '../models/update-user.payload';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {

  constructor(
    private readonly usersService: UserService
  ) { }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('email/:email')
  @ApiOkResponse({ type: UserEntity })
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() body: CreateUserPayload) {
    return this.usersService.create(body);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() body: UpdateUserPayload) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
