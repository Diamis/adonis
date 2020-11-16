"use strict";

const Schema = use("Schema");

class ProductsSchema extends Schema {
  up() {
    this.create("products", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("slug").notNullable();
      table.text('description').nullable();
      table.integer("sort").nullable();
      table.jsonb("attribute_data").nullable();
      table.jsonb("option_data").nullable();
      table.timestamps();
    });
  }

  down() {
    this.dropIfExists("products");
  }
}

module.exports = ProductsSchema;
