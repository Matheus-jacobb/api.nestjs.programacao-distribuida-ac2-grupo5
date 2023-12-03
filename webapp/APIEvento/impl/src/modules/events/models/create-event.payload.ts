//#region Imports

import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsEnum, IsNumber, IsString } from 'class-validator';

import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';
import { TypeEnum } from './type.enum';

//#endregion

export class CreateEventPayload {

  @ApiProperty()
  @IsDefined({ message: 'É necessário informar o tipo do evento.' })
  @IsEnum(TypeEnum, { message: DefaultValidationMessages.IsEnum })
  public type: TypeEnum;

  @ApiProperty()
  @IsDefined({ message: 'É necessário informar o lugar onde o evento ocorrerá.' })
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public placeId: number;

  @ApiProperty()
  @IsDefined({ message: 'É necessário informar a data de inicio do evento.' })
  @IsString( { message: DefaultValidationMessages.IsString })
  public startDate: string;

  @ApiProperty()
  @IsDefined({ message: 'É necessário informar a data de término do evento.' })
  @IsString( { message: DefaultValidationMessages.IsString })
  public endDate: string;

}
