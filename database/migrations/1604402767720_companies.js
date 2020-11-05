"use strict";

const Schema = use("Schema");

class CompaniesSchema extends Schema {
  up() {
    this.create("companies", (table) => {
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.string("name").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("categories");
  }
}

module.exports = CompaniesSchema;
