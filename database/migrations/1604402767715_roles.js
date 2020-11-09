"use strict";

const Schema = use("Schema");

class RolesSchema extends Schema {
  up() {
    this.create("roles", (table) => {
      table.increments();
      table.string("name");
      table.string("guard_name");
      table.timestamps();
    });

    this.create("role_has_permissions", (table) => {
      table.increments();
      table.integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles');
      table.integer("model_id");
      table.string("model_type");
      table.timestamps();
    });
  }

  down() {
    this.drop("role_has_permissions");
    this.drop("roles");
  }
}

module.exports = RolesSchema;
