'use strict'
 
const Schema = use('Schema')

class ProductCategory extends Schema {
  up () {
    this.create('product_categories', (table) => {
      table.integer("product_id").unsigned();
      table.foreign("product_id").references("id").inTable("products");

      table.integer("category_id").unsigned();
      table.foreign("category_id").references("id").inTable("categories");
    })
  }

  down () {
    this.table('product_categories', (table) => {
      table.dropForeign("product_id");
      table.dropForeign("category_id");
    });
    
    this.drop('product_categories')
  }
}

module.exports = ProductCategory 
