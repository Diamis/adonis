"use strict";

const Schema = use("Schema");

class PermissionSchema extends Schema {
  up() {
    this.create("permissions", (table) => {
      table.increments();
      table.string("name");
      table.string("guard_name");
      table.timestamps();
    });

    this.create("model_has_permissions", (table) => {
      table.increments();
      table
        .integer("permission_id")
        .unsigned()
        .references("id")
        .inTable("permissions");
      table.integer("model_id");
      table.string("model_type");
      table.timestamps();
    });
  }

  down() {
    this.dropIfExists("model_has_permissions");
    this.dropIfExists("permissions");
  }
}

module.exports = PermissionSchema;
