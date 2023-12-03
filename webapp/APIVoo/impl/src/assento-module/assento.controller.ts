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
import { AssentoInsertDTO } from 'src/types/dto/assento-insert.dto';
import { AssentoUpdateDTO } from 'src/types/dto/assento-update.dto';
import { AssentoDTO } from 'src/types/dto/assento.dto';
import { VooService } from 'src/voo-module/voo.service';
import { AssentoService } from './assento.service';

@Controller('assentos')
@ApiTags('Assentos')
export class AssentoController {
  constructor(
    private readonly assentoService: AssentoService,
    private readonly vooService: VooService,
  ) {}

  @Post()
  @ApiOkResponse({
    description: 'Assento criado',
    type: AssentoDTO,
  })
  async create(@Body() assento: AssentoInsertDTO) {
    const voo = await this.vooService.findEntity(assento.vooId);
    return this.assentoService.create(assento, voo);
  }

  @Get()
  @ApiOkResponse({
    description: 'Assentos retornados',
    type: [AssentoDTO],
  })
  async findAll() {
    return this.assentoService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Assento retornado',
    type: AssentoDTO,
  })
  async findOne(@Param('id') id: number) {
    return this.assentoService.findOne(id);
  }

  @Put('/:id')
  @ApiOkResponse({
    description: 'Assento atualizado',
    type: AssentoDTO,
  })
  async update(@Param('id') id: number, @Body() assento: AssentoUpdateDTO) {
    return this.assentoService.update(id, assento);
  }

  @HttpCode(204)
  @Delete('/:id')
  @ApiOkResponse({
    description: 'Assento deletado',
  })
  async delete(@Param('id') id: number) {
    return this.assentoService.remove(id);
  }
}
