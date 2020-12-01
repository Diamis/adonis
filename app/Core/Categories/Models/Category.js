"use script";

const Model = use("Model");

class Category extends Model {
  static get table() {
    return "categories";
  }

  static boot() {
    super.boot();
    this.addTrait('NestedSet');
  }

  /**
   * @method hasChildren
   * @return {boolean}
   */
  hasChildren() {
    return !!this.children().count();
  }

  /**
   * @method children
   */
  children() {
    return this.hasMany('App/Core/Categories/Models/Category', 'id', 'parent_id');
  }

  /**
   * @method parent
   */
  parent() {
    return this.hasMany('App/Core/Categories/Models/Category', 'parent_id', 'id');
  }

  products() {
    return this.hasMany('App/Core/Products/Models/Product');
  }

  attributes() {
    return this.belongsToMany('App/Core/Attributes/Models/Attribute')
      .pivotTable('category_attributes');
  }
}

module.exports = Category;
