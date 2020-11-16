"use script";

const Model = use("Model");
const Translate = use("App/Core/Helpers/Translate");

class Product extends Model {
  static get table() {
    return "products";
  }

  static boot() {
    super.boot();

    this.addHook("beforeCreate", this.actionBeforeCreate);
    this.addHook("beforeUpdate", this.actionBeforeUpdate);
    this.addHook("afterDelete", this.actionAfterDelete);
  }

  static async actionBeforeCreate(instance){
    const { name, slug } = instance;
    if(name && !slug) {
      instance.slug = Translate.toLatin(name);
    }
  }

  static async actionBeforeUpdate(instance){}

  static async actionAfterDelete(){}

  variants () {
    return this.hasMany('App/Core/Products/Models/ProductVariant');
  }

  categories () {
    return this.hasMany('App/Core/Categories/Models/Category');
  }
}

module.exports = Product;
