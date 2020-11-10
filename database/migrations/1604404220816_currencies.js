"use strict";

const Schema = use("Schema");

class CurrenciesSchema extends Schema {
  up() {
    this.create("currencies", (table) => {
      table.increments();
      table.boolean("enabled").nullable().default(true);
      table.string("code").unique();
      table.string("name").unique();
      table.string("format");
      table.timestamps();
    });
  }

  down() {
    this.dropIfExists("currencies");
  }
}

module.exports = CurrenciesSchema;
