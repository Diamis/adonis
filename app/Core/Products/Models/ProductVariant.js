"use script";

const Model = use("Model");

class ProductVariant extends Model {
  static get table() {
    return "product_variants";
  }

  static boot() {
    super.boot();
  }

  static async actionBeforeCreate(instance){}
  static async actionBeforeUpdate(instance){}
  static async actionAfterDelete(){}

  product () {
    return this.hasOne('App/Core/Products/Models/Product')
  }
}

module.exports = ProductVariant;
