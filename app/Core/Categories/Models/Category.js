"use script";

const Model = use("Model");
const Database = use("Database");

class Category extends Model {
  static get table() {
    return "categories";
  }

  static boot() {
    super.boot();

    this.addHook("beforeCreate", this.actionBeforeCreate);
  }

  /**
   * Nested sets
   * @param {Category} instance
   */
  static actionBeforeCreate = async (instance) => {
    const { right, level } = await this.buildNested(instance);

    await Category.query().where("left", ">", right).increment("left", 2);
    await Category.query().where("right", ">=", right).increment("right", 2);

    instance.left = right;
    instance.right = right + 1;
    instance.level = level !== undefined ? level + 1 : 0;
  };

  static async buildNested(instance) {
    let right = 1;
    let level;

    const { parent_id } = instance;
    const parent = parent_id && (await Category.find(parent_id));
    if (parent) {
      right = parent.right;
      level = parent.level;
    }

    return {
      right,
      level,
    };
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
