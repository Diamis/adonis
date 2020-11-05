"use strict";

const Schema = use("Schema");

class CurrenciesSchema extends Schema {
  up() {
    this.create("attributes", (table) => {
      table.increments();
      table.boolean("enabled").nullable().default(true);
      table.string("code").unique();
      table.string("name").unique();
      table.string("format");
      table.timestamps();
    });
  }

  down() {
    this.drop("attributes");
  }
}

module.exports = CurrenciesSchema;
