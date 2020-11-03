"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AdSchema extends Schema {
  up() {
    this.create("ads", (table) => {
      table.increments();
      table.uuid("uid");
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.string("name").nullable();
      table.string("slug").nullable();
      table.text("description").nullable();
      table.jsonb("properties").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("ads");
  }
}

module.exports = AdSchema;
