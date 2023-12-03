import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AssentoService } from 'src/assento-module/assento.service';
import { ReservaInsertDTO } from 'src/types/dto/reserva-insert.dto';
import { ReservaDTO } from 'src/types/dto/reserva.dto';
import { ReservaService } from './reserva.service';

@Controller('reservas')
@ApiTags('Reservas')
export class ReservaController {
  constructor(
    private readonly service: ReservaService,
    private readonly assentoService: AssentoService,
  ) {}

  @Post()
  @ApiOkResponse({
    description: 'Reserva criada',
    type: ReservaDTO,
  })
  async create(@Body() reserva: ReservaInsertDTO) {
    const assento = await this.assentoService.findEntity(reserva.assentoId);
    await this.assentoService.reservar(assento.id);
    const reservaResponse = await this.service.create(reserva, assento);
    return reservaResponse;
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Reserva retornada',
    type: ReservaDTO,
  })
  async findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @HttpCode(204)
  @Delete('/:id')
  @ApiOkResponse({
    description: 'Reserva deletada',
  })
  async delete(@Param('id') id: number) {
    const reserva = await this.service.findEntity(id);
    await this.assentoService.desreservar(reserva.assento.id);
    return await this.service.remove(id);
  }
}
