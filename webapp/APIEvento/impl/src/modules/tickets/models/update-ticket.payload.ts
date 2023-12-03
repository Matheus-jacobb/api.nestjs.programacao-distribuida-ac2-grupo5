//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsEmail, IsOptional, IsString } from 'class-validator';

import { BaseCrudUpdatePayload } from '../../../common/base-crud-update.payload';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * As informações enviadas para atualizar um usuário
 */
export class UpdateTicketPayload extends BaseCrudUpdatePayload {

  public userId: number;
  public eventId: number;
  public chair: number;
  public isVip: boolean;

}
