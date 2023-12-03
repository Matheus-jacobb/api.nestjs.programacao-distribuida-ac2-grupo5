import { VooDTO } from "src/types/dto/voo.dto";
import { Voo } from "src/types/voo.entity";

export class VooAssembler{
    public static voosToDTOs(voos: Voo[]): VooDTO[]{
        return voos?.map(voo => this.vooToDTO(voo));
    }

    public static vooToDTO(voo: Voo): VooDTO{
        return  {
            id : voo?.id,
            origem : voo?.origem,
            destino : voo?.destino,
            data : voo?.data
        }
    }
}