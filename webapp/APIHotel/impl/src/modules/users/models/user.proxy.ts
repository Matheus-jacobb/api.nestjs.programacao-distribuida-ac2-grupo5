import { ReservationEntity } from "../../reservations/entities/reservation.entity";

export class UserProxy {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  password: string;
  reservations?: ReservationEntity[];
}
