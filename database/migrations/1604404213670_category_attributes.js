'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoryAttributesSchema extends Schema {
  up () {
    this.create('category_attributes', (table) => {
      table.increments();

      table.integer('category_id').unsigned();
      table.foreign('category_id').references("id").inTable("categories");

      table.integer('attribute_id').unsigned();
      table.foreign('attribute_id').references("id").inTable("attributes");
    })
  }

  down () {
    this.table('category_attributes', (table) => {
      table.dropForeign('category_id');
      table.dropForeign('attribute_id');
    });

    this.drop('category_attributes')
  }
}

module.exports = CategoryAttributesSchema
