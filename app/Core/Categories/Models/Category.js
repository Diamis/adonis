"use script";

const Model = use("Model");

class Category extends Model {
  static boot() {
    super.boot();
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
   * @return {Object}
   */
  children() {
    return this.hasMany();
  }

  /**
   * @method children
   * @return {Object}
   */
  parent() {
    return this.belongsTo();
  }
}

module.exports = Category;
