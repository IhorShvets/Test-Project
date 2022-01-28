import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserNameToUsers1643121594333 implements MigrationInterface {
  name = 'AddUserNameToUsers1643121594333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
  }
}
