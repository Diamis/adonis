'use script';

const Model = use('Model');
const { sanitizor } = use('Validator');

class Product extends Model {
  static get table() {
    return 'products';
  }

  static boot() {
    super.boot();

    this.addHook('beforeCreate', this.actionBeforeCreate);
    this.addHook('beforeUpdate', this.actionBeforeUpdate);
    this.addHook('afterDelete', this.actionAfterDelete);
  }

  static async actionBeforeCreate(instance) {
    const { name, slug } = instance;
    if (name && !slug) {
      instance.slug = sanitizor.slug(name);
    }
  }

  static async actionBeforeUpdate(instance) {}

  static async actionAfterDelete() {}

  static instanceof(instatce) {
    if (!(instatce instanceof Product)) {
      throw new Error('Parameter must be subclass Product');
    }
  }

  variants() {
    return this.hasMany('App/Core/Products/Models/ProductVariant', 'id', 'product_id');
  }

  categories() {
    return this.hasMany('App/Core/Categories/Models/Category', 'id', 'category_id');
  }
}

module.exports = Product;
