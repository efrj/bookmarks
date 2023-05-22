import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTables1624543368404 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "Users",
      columns: [
        {
          name: "user_id",
          type: "integer",
          isPrimary: true,
          isGenerated: true
        },
        {
          name: "username",
          type: "varchar",
        },
        {
          name: "password",
          type: "varchar",
        },
        {
          name: "email",
          type: "varchar",
        }
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: "Folders",
      columns: [
        {
          name: "folder_id",
          type: "integer",
          isPrimary: true,
          isGenerated: true
        },
        {
          name: "user_id",
          type: "integer",
        },
        {
          name: "parent_folder_id",
          type: "integer",
          isNullable: true
        },
        {
          name: "name",
          type: "varchar",
        },
        {
          name: "date_added",
          type: "timestamp",
        },
        {
          name: "last_modified",
          type: "timestamp",
        }
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: "Bookmarks",
      columns: [
        {
          name: "bookmark_id",
          type: "integer",
          isPrimary: true,
          isGenerated: true
        },
        {
          name: "user_id",
          type: "integer",
        },
        {
          name: "folder_id",
          type: "integer",
          isNullable: true
        },
        {
          name: "url",
          type: "text",
        },
        {
          name: "title",
          type: "varchar",
        },
        {
          name: "date_added",
          type: "timestamp",
        },
        {
          name: "last_modified",
          type: "timestamp",
        }
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: "Tags",
      columns: [
        {
          name: "tag_id",
          type: "integer",
          isPrimary: true,
          isGenerated: true
        },
        {
          name: "name",
          type: "varchar",
        }
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: "BookmarkTags",
      columns: [
        {
          name: "bookmark_id",
          type: "integer",
        },
        {
          name: "tag_id",
          type: "integer",
        }
      ]
    }), true)
    
    await queryRunner.createForeignKey("Bookmarks", new TableForeignKey({
      columnNames: ["user_id"],
      referencedColumnNames: ["user_id"],
      referencedTableName: "Users",
      onDelete: "CASCADE"
    }));
    await queryRunner.createForeignKey("Bookmarks", new TableForeignKey({
      columnNames: ["folder_id"],
      referencedColumnNames: ["folder_id"],
      referencedTableName: "Folders",
      onDelete: "CASCADE"
    }));
    await queryRunner.createForeignKey("BookmarkTags", new TableForeignKey({
      columnNames: ["bookmark_id"],
      referencedColumnNames: ["bookmark_id"],
      referencedTableName: "Bookmarks",
      onDelete: "CASCADE"
    }));
    await queryRunner.createForeignKey("BookmarkTags", new TableForeignKey({
      columnNames: ["tag_id"],
      referencedColumnNames: ["tag_id"],
      referencedTableName: "Tags",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("BookmarkTags", "FK_BookmarkTags_TagId");
    await queryRunner.dropForeignKey("BookmarkTags", "FK_BookmarkTags_BookmarkId");
    await queryRunner.dropForeignKey("Bookmarks", "FK_Bookmarks_FolderId");
    await queryRunner.dropForeignKey("Bookmarks", "FK_Bookmarks_UserId");

    await queryRunner.dropTable("BookmarkTags", true);
    await queryRunner.dropTable("Tags", true);
    await queryRunner.dropTable("Bookmarks", true);
    await queryRunner.dropTable("Folders", true);
    await queryRunner.dropTable("Users", true);
  }
}
