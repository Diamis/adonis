"use script";

const QueryBuilder = use("App/Core/Categories/QueryBuilder");

class Category extends QueryBuilder {
  static get table() {
    return "categories";
  }

  static boot() {
    super.boot();
  }

  assertNodeExists() {
    if (!this.left || !this.right) {
      throw new Error("Node must exists.");
    }

    return this;
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
    return this.hasMany("App/Core/Models/Category").query().whereRaw("left");
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
