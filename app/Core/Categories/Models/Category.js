"use script";

const QueryBuilder = use("App/Core/Categories/QueryBuilder");

class Category extends QueryBuilder {
  static get table() {
    return "categories";
  }

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
