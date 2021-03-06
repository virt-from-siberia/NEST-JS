import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsernameToUsers1641373997189
  implements MigrationInterface
{
  name = 'CreateUsernameToUsers1641373997189';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying NOT NULL`,
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "username"`,
    );
  }
}
