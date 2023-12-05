//#region Imports

import {ApiProperty} from "@nestjs/swagger";
import {IsDefined} from "class-validator";
export class CreateTicketPayload {

  @ApiProperty()
  @IsDefined({ message: '' })
  public userId: number;

  @ApiProperty()
  @IsDefined({ message: '' })
  public eventId: number;

  @ApiProperty()
  @IsDefined({ message: '' })
  public chair: number;

  @ApiProperty()
  @IsDefined({ message: '' })
  public isVip: boolean;

}

