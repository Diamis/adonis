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
    this.addHook("beforeUpdate", this.actionBeforeUpdate);
    this.addHook("afterDelete", this.actionAfterDelete);
  }

  /**
   * Nested sets create
   * @param {Category} instance
   */
  static actionBeforeCreate = async (instance) => {
    const { right, level } = await Category.buildNested(instance);
 
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
    const { left, right } = instance;
    const width = right - left + 1; // вычисляем длину диапазона ключей удаляемого узла

    // При наличии дочерних узлов удаляем их
    if(width > 2) {
      await Category.query().where('left', '>', left).where('right', '<', right).delete();
    }

    // Обновляем ключи оставшихся веток
    await Category.query().where('right', '>', right).update({
      right: Database.raw(`?? - ${width}`, ['right']),
      left: Database.raw(`CASE WHEN ?? > ${left} THEN ?? - ${width} ELSE ?? END`, ['left', 'left','left']),
    });
  }

  /** 
   * Nested sets move to
   * @param {Category} instance
   * @returns {Promise<{level: *, right: number}>}
   */
  static actionBeforeUpdate = async (instance) => { 
    // TODO: реализовать корректное перемещение узла
    if(instance.dirty.parent_id) {
      const width = instance.right - instance.left + 1;
      
      // step 1: узел и дочерние элементы делает отрицательными
      await Category.query().where('left', '>=', instance.left).where('right', '<=', instance.right).update({
        left: Database.raw('?? * (-1)', ['left']),
        right: Database.raw('?? * (-1)', ['right'])
      });

      // step 2: смещаем узлы
      await Category.query().where('left', '>', instance.right).update({
        left: Database.raw(`?? - ${width}`, ['left']),
        right: Database.raw(`?? - ${width}`, ['right'])
      });

      // step 3: получаем значения родителя и увеличиваем значение узла
      const { right, parent } = await Category.buildNested(instance);
      if(parent) {
        parent.right = parent.right + width;
        await parent.save();
      }

      // step 4: выстраиваем новые для узла
      const newWidth = right - instance.right - 1 + width;
      await Category.query().where('left', '<=', 0-instance.left).where('right', '>=', 0-instance.right).update({
        left: Database.raw(`?? * (-1) + ${newWidth}`, ['left']),
        right: Database.raw(`?? * (-1) + ${newWidth}`, ['right'])
      });
    }
  }

  static async buildNested(instance) {
    let right = 2;
    let level;

    const { parent_id } = instance;
    const parent = parent_id && (await Category.find(parent_id));
    if (parent) {
      right = parent.right;
      level = parent.level;
    } else {
      let count = await Category.query().getCount();

      count = parseInt(count) + 1;
      right = count * 2 || right;
    }

    return {
      right,
      level,
      parent
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
      .where('right', '<=', this.right)
      .orderBy('left', 'asc')
      .fetch();
  }

  /**
   * @method children
   * @return {Object}
   */
  parents(select = ["*"]) {
    return Category.query()
      .select(...select)
      .where('left', '<=', this.left)
      .where('right', '>=', this.right)
      .orderBy('left', 'asc')
      .fetch();
  }

  products () {
    return this.hasMany('App/Core/Products/Models/Product');
  }
}

module.exports = Category;
