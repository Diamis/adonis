"use script";

const Model = use("Model");

class Category extends Model {
  static get table() {
    return "categories";
  }

  static boot() {
    super.boot();

    this.addHook("beforeCreate", this.actionBeforeCreate);
    this.addHook('afterDelete', this.actionAfterRemove);
  }

  /**
   * Nested sets create
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

  /**
   * Nested sets delete
   * @param {Category} instance
   */
  static actionAfterDelete = async (instance) => {
    console.log('remove');
    console.log('instance', instance);
  }

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
   * @param {Array} select
   *
   * @return {Object}
   */
  children( select = ["*"]) {
    return Category.query()
      .select(...select)
      .where('left', '>=', this.left)
      .andWhere('right', '<=', this.right)
      .orderBy('left', 'asc')
      .fetch();
  }

  /**
   * @method children
   * @return {Object}
   */
  // parent() {
    // return this.belongsTo();
  // }
}

module.exports = Category;
