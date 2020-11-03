"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AdPriceSchema extends Schema {
  up() {
    this.create("ad_prices", (table) => {
      table.increments();
      table.integer("ad_uid").unsigned().references("uid").inTable("ads");
      table.float("value");
      table.timestamps();
    });
  }

  down() {
    this.drop("ad_prices");
  }
}

module.exports = AdPriceSchema;
