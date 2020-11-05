"use strict";

const Schema = use("Schema");

class CategoriesSchema extends Schema {
  up() {
    this.create("categories", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("slug").notNullable();
      table.integer("sort").nullable();
      table.integer("lft").default(0);
      table.integer("rgt").default(0);
      table.integer("parent_id").nullable();
      table.jsonb("attribute_data").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("categories");
  }
}

module.exports = CategoriesSchema;
