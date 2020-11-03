"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AdAttrSchema extends Schema {
  up() {
    this.create("ad_attrs", (table) => {
      table.uuid("uid");
      table.string("name").notNullable();
      table.string("slug").notNullable();
      table.integer("sort").nullable();
      table.jsonb("settings").nullable();
    });
  }

  down() {
    this.drop("ad_attrs");
  }
}

module.exports = AdAttrSchema;
