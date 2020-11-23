'use strict'

const Schema = use('Schema')

class AssetSource extends Schema {
  up () {
    this.create('asset_sources', (table) => {
      table.increments()
      table.string('name')
      table.string('handle').unique();
      table.string('disk');
      table.boolean('default').default(false);
      table.string('path').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('asset_sources')
  }
}

module.exports = AssetSource
