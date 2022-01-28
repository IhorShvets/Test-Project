import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1643114594843 implements MigrationInterface {
  name = 'SeedDb1643114594843';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags("name") VALUES ('dragons'), ('coffee'), ('reactjs')`,
    );
  }

  public async down(): Promise<void> {
    return null;
  }
}
