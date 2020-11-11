"use strict";

const Schema = use("Schema");

class CategoriesSchema extends Schema {
  up() {
    this.create("categories", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("slug").notNullable();
      table.integer("sort").nullable();
      table.integer("left").notNullable();
      table.integer("right").notNullable();
      table.integer("level").default(0);
      table.integer("parent_id").default(0);
      table.jsonb("attribute_data").nullable();
      table.timestamps();
    });
  }

  down() {
    this.dropIfExists("categories");
  }
}

module.exports = CategoriesSchema;
