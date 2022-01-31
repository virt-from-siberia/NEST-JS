import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1641361040766
  implements MigrationInterface
{
  name = 'SeedDb1641361040766';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')
    `);

    // password is 123123
    await queryRunner.query(`
        INSERT INTO users (username, email, password)  VALUES('foo', 'foo@mail.ru', '$2b$10$/vN5S4Tv5.xmX2hUluoVM.VMGRuXpPE1iZsl3n7ivZxIUgGJD78gm' )
    `);

    await queryRunner.query(`
      INSERT INTO articles(slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First-article', 'first-article-description', 'first-article body', 'coffee,dragons', 1)
    `);

    await queryRunner.query(`
      INSERT INTO articles(slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'second-article', 'second-article-description', 'second-article body', 'coffee,dragons', 1)
    `);
  }

  public async down(): Promise<void> {}
}
