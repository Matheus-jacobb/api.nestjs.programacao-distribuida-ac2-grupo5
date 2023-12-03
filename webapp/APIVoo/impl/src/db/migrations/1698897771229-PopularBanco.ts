import { MigrationInterface, QueryRunner } from 'typeorm';
import { Assento } from '../../types/assento.entity';
import { Voo } from '../../types/voo.entity';

export class PopularBanco1698897771229 implements MigrationInterface {
  name = 'PopularBanco1698897771229';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const vooSPParaRJ = await queryRunner.manager.save(Voo, {
      origem: 'São Paulo',
      destino: 'Rio de Janeiro',
      data: new Date('2021-10-10T00:00:00'),
    });

    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 1,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 2,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 3,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 4,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 5,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 6,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 7,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 8,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 9,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 10,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 1,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 2,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 3,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 4,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 5,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 6,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 7,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 8,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 9,
      voo: vooSPParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 10,
      voo: vooSPParaRJ,
      reservado: false,
    });

    const vooSPParaCWB = await queryRunner.manager.save(Voo, {
      origem: 'São Paulo',
      destino: 'Curitiba',
      data: new Date('2021-10-10T00:00:00'),
    });

    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 1,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 2,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 3,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 4,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 5,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 6,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 7,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 8,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 9,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 10,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 1,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 2,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 3,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 4,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 5,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 6,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 7,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 8,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 9,
      voo: vooSPParaCWB,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 10,
      voo: vooSPParaCWB,
      reservado: false,
    });

    const vooRJParaSP = await queryRunner.manager.save(Voo, {
      origem: 'Rio de Janeiro',
      destino: 'São Paulo',
      data: new Date('2021-10-11T00:00:00'),
    });

    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 1,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 2,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 3,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 4,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 5,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 6,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 7,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 8,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 9,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 10,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 1,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 2,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 3,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 4,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 5,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 6,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 7,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 8,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 9,
      voo: vooRJParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 10,
      voo: vooRJParaSP,
      reservado: false,
    });

    const vooRJParaPR = await queryRunner.manager.save(Voo, {
      origem: 'Rio de Janeiro',
      destino: 'Curitiba',
      data: new Date('2021-10-11T00:00:00'),
    });

    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 1,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 2,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 3,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 4,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 5,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 6,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 7,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 8,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 9,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 10,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 1,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 2,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 3,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 4,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 5,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 6,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 7,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 8,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 9,
      voo: vooRJParaPR,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 10,
      voo: vooRJParaPR,
      reservado: false,
    });

    const vooPRParaSP = await queryRunner.manager.save(Voo, {
      origem: 'Curitiba',
      destino: 'São Paulo',
      data: new Date('2021-10-12T00:00:00'),
    });

    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 1,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 2,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 3,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 4,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 5,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 6,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 7,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 8,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 9,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 10,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 1,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 2,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 3,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 4,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 5,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 6,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 7,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 8,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 9,
      voo: vooPRParaSP,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 10,
      voo: vooPRParaSP,
      reservado: false,
    });

    const vooPRParaRJ = await queryRunner.manager.save(Voo, {
      origem: 'Curitiba',
      destino: 'Rio de Janeiro',
      data: new Date('2021-10-12T00:00:00'),
    });

    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 1,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 2,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 3,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 4,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 5,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 6,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 7,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 8,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 9,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'A',
      numero: 10,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 1,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 2,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 3,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 4,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 5,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 6,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 7,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 8,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 9,
      voo: vooPRParaRJ,
      reservado: false,
    });
    await queryRunner.manager.save(Assento, {
      fileira: 'B',
      numero: 10,
      voo: vooPRParaRJ,
      reservado: false,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reserva" DROP CONSTRAINT "FK_c5efc2f281e6328726411e99adc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assento" DROP CONSTRAINT "FK_044ae1a123fa3e6cf7668d0f69f"`,
    );
    await queryRunner.query(`DROP TABLE "reserva"`);
    await queryRunner.query(`DROP TABLE "assento"`);
    await queryRunner.query(`DROP TABLE "voo"`);
  }
}
