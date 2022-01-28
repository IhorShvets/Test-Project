import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateArticles1643204631985 implements MigrationInterface {
  name = 'CreateArticles1643204631985';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "slug" SET DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "slug" DROP DEFAULT`,
    );
  }
}
