import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { VooInsertDTO } from 'src/types/dto/voo-insert.dto';
import { VooDTO } from 'src/types/dto/voo.dto';
import { VooAssentosDTO } from 'src/types/dto/vooAssentos.dto';
import { Voo } from 'src/types/voo.entity';
import { VooService } from './voo.service';

@Controller('voos')
@ApiTags('Voos')
export class VooController {
  constructor(private readonly voosService: VooService) {}

  @Post()
  @ApiOkResponse({
    description: 'Voo criado',
    type: VooDTO,
  })
  async create(@Body() voo: VooInsertDTO) {
    return this.voosService.create(voo);
  }

  @Get()
  @ApiOkResponse({
    description: 'Voos retornados',
    type: [VooDTO],
  })
  async findAll() {
    return this.voosService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Voo retornado',
    type: VooDTO,
  })
  async findOne(@Param('id') id: string) {
    return this.voosService.findOne(+id);
  }

  @Get('/:id/assentos')
  @ApiOkResponse({
    description: 'Voo e seus assentos retornado',
    type: VooAssentosDTO,
  })
  async findAssentosByBooId(@Param('id') id: string) {
    const voo = await this.voosService.findEntity(+id);

    return plainToClass(VooAssentosDTO, voo);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Voo atualizado',
    type: VooDTO,
  })
  async update(@Param('id') id: string, @Body() updatedVoo: Voo) {
    return this.voosService.update(+id, updatedVoo);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.voosService.remove(+id);
  }
}
