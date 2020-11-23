'use strict'

const Schema = use('Schema')

class Assets extends Schema {
  up () {
    this.create('assets', (table) => {
      table.increments()
      table.integer('asset_source_id').unsigned().nullable();
      table.foreign('asset_source_id').references('id').inTable('asset_sources');
      table.string('filename').nullable().unique();
      table.string('original_filename').nullable();
      table.string('extension').nullable();
      table.integer('size').nullable();
      table.string('width').nullable();
      table.string('height').nullable();
      table.integer('position').default(0);
      table.timestamps()
    })
  }

  down () {
    this.drop('assets')
  }
}

module.exports = Assets
