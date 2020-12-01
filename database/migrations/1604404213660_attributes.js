"use strict";

const Schema = use("Schema");
const Attribute = use("App/Core/Attributes/Models/Attribute");

class AttributesSchema extends Schema {
  up() {
    this.create("attributes", (table) => {
      table.increments();
      table.enum("type", Attribute.types).default("text");
      table.enum("validation", Attribute.validations).nullable();
      table.string("name");
      table.integer("sort").default(0);
      table.boolean("is_required").default(0);
      table.boolean("is_filterable").default(0)
      table.jsonb("settings").nullable(); 
    });
  }

  down() {
    this.dropIfExists("attributes");
  }
}

module.exports = AttributesSchema;
