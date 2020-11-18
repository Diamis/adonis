"use strict";

const Schema = use("Schema");

class ProductsSchema extends Schema {
  up() {
    this.create("products", (table) => {
      table.increments();
      table.string("name").notNullable().comment('Название продукта');
      table.string("slug").notNullable().comment('Стороковый идентификатор');
      table.text('description').nullable().comment('Описание о продукте');
      table.integer("sort").nullable().comment('Сортировка');
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
