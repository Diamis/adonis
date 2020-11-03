"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AdAttrCategorySchema extends Schema {
  up() {
    this.create("ad_attr_categories", (table) => {
      table.integer("ad_uid").unsigned().references("uid").inTable("ads");

      table
        .integer("attr_uid")
        .unsigned()
        .references("uid")
        .inTable("ad_attrs");

      table
        .integer("category_uid")
        .unsigned()
        .references("uid")
        .inTable("categories");
    });
  }

  down() {
    this.drop("ad_attr_categories");
  }
}

module.exports = AdAttrCategorySchema;
