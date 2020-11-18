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

  static instanceof(instatce) {
    if(!(instatce instanceof ProductVariant)) {
      throw new Error('Parameter must be subclass ProductVariant');
    }
  }

  product () {
    return this.hasOne('App/Core/Products/Models/Product', 'product_id', 'id')
  }
}

module.exports = ProductVariant;
