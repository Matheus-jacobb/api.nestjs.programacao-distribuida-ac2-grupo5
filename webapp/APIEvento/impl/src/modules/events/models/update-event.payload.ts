//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsEnum, IsNumber, IsString } from 'class-validator';

import { BaseCrudUpdatePayload } from '../../../common/base-crud-update.payload';
import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';
import { TypeEnum } from './type.enum';

//#endregion

export class UpdateEventPayload extends BaseCrudUpdatePayload {

  @ApiProperty()
  @IsOptional()
  @IsEnum(TypeEnum, { message: DefaultValidationMessages.IsEnum })
  public type?: TypeEnum;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
  public placeId?: number;

  @ApiProperty()
  @IsOptional()
  @IsString( { message: DefaultValidationMessages.IsString })
  public startDate?: string;

  @ApiProperty()
  @IsOptional()
  @IsString( { message: DefaultValidationMessages.IsString })
  public endDate?: string;

}
