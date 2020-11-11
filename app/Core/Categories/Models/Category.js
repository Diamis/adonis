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

  static actionBeforeCreate = async (instance) => {
    const { left, right, level } = await this.buildNested(instance);
    const sql = Database.table(Category.table);

    sql.where("left", ">", left).increment("left", 2);
    sql.where("right", ">", right).increment("right", 2);

    instance.left = left + 1;
    instance.right = right + 1;
    instance.level = level + 1;
  };

  static async buildNested(instance) {
    let left = 0;
    let right = 1;
    let level = 0;

    const { parent_id } = instance;
    if (parent_id) {
      const parent = await Category.find(parent_id);
      if (parent) {
        left = parent.left;
        right = parent.right;
        level = parent.level;
      }
    }

    return {
      left,
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
