"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AdLocationSchema extends Schema {
  up() {
    this.create("ad_locations", (table) => {
      table.increments();
      table.integer("ad_uid").unsigned().references("uid").inTable("ads");
      table.string("place");
      table.float("latitude");
      table.float("longitude");
      table.timestamps();
    });
  }

  down() {
    this.drop("ad_locations");
  }
}

module.exports = AdLocationSchema;
