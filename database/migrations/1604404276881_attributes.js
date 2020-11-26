"use strict";

const Schema = use("Schema");
const Attribute = use("App/Core/Attributes/Models/Attribute");

class AttributesSchema extends Schema {
  up() {
    this.create("attributes", (table) => {
      table.increments();
      table.string("name");
      table.integer("sort");
      table.boolean("required").default(false);
      table.enum("type", Attribute.types).default("text");
      table.timestamps();
    });
  }

  down() {
    this.dropIfExists("attributes");
  }
}

module.exports = AttributesSchema;
