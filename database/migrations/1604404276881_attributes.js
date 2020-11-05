"use strict";

const Schema = use("Schema");

class AttributesSchema extends Schema {
  up() {
    this.create("attributes", (table) => {
      table.increments();
      table.string("name");
      table.integer("sort");
      table.boolean("required");
      table
        .enum("type", [
          "text",
          "textarea",
          "select",
          "redio",
          "checkbox",
          "date",
          "time",
          "switch",
          "number",
        ])
        .default("text");
      table.timestamps();
    });
  }

  down() {
    this.drop("attributes");
  }
}

module.exports = AttributesSchema;
