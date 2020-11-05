"use strict";

const Schema = use("Schema");

class ChannelsSchema extends Schema {
  up() {
    this.create("channels", (table) => {
      table.increments();
      table.string("name").unique();
      table.string("handle").unique();
      table.boolean("default").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("channels");
  }
}

module.exports = ChannelsSchema;
