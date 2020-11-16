'use strict'

const Schema = use('Schema');

class ProductVariant extends Schema {
  up () {
    this.create('product_variants', (table) => {
      table.increments()
      table.insert("product_id").unsigned().references("id").inTable("products");
      table.decimal("price", 10, 2).unsigned();
      table.insert("min_qty").nullable();
      table.insert("unit_qty").nullable();
      table.jsonb("options").nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('product_variants')
  }
}

module.exports = ProductVariant
