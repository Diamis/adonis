'use strict';

const Database = use("Database");

class NestedSet {
  register (Model) {
    this.table = Model.table;

    Model.prototype.nestedChildren = function (select = ["*"]) {
      return Model.query()
        .select(...select)
        .where('left', '>=', this.left)
        .where('right', '<=', this.right)
        .orderBy('left', 'asc')
        .fetch();
    }

    Model.prototype.nestedParent = function (select = ["*"]) {
      return Model.query()
        .select(...select)
        .where('left', '<=', this.left)
        .where('right', '>=', this.right)
        .orderBy('left', 'asc')
        .fetch();
    }

    Model.addHook("beforeCreate", this.actionBeforeCreate);
    Model.addHook("beforeUpdate", this.actionBeforeUpdate);
    Model.addHook("afterDelete", this.actionAfterDelete);
  }

  /**
   * Nested sets create
   * @param {Model} instance
   */
  actionBeforeCreate = async (instance) => {
    const { right, level } = await this.buildNested(instance);

    await Database.from(this.table).where("left", ">", right).increment("left", 2);
    await Database.from(this.table).where("right", ">=", right).increment("right", 2);

    instance.left = right;
    instance.right = right + 1;
    instance.level = level !== undefined ? level + 1 : 0;
  };

  /**
   * Nested sets delete
   * @param {Model} instance
   */
  actionAfterDelete = async (instance) => {
    const { left, right } = instance;
    const width = right - left + 1; // вычисляем длину диапазона ключей удаляемого узла

    // При наличии дочерних узлов удаляем их
    if(width > 2) {
      await Database.from(this.table)
        .where('left', '>', left)
        .where('right', '<', right)
        .delete();
    }

    // Обновляем ключи оставшихся веток
    await Database.from(this.table).where('right', '>', right).update({
      right: Database.raw(`?? - ${width}`, ['right']),
      left: Database.raw(`CASE WHEN ?? > ${left} THEN ?? - ${width} ELSE ?? END`, ['left', 'left','left']),
    });
  }

  /**
   * Nested sets move to
   * @param {Model} instance
   * @returns {Promise<{level: *, right: number}>}
   */
  actionBeforeUpdate = async (instance) => {
    if (instance.dirty.parent_id) {
      const width = instance.right - instance.left + 1;

      // step 1: узел и дочерние элементы делает отрицательными
      await Database.from(this.table).where('left', '>=', instance.left).where('right', '<=', instance.right).update({
        left: Database.raw('?? * (-1)', ['left']),
        right: Database.raw('?? * (-1)', ['right'])
      });

      // step 2: смещаем узлы
      await Database.from(this.table).where('right', '>=', instance.right).update({
        left: Database.raw(`CASE WHEN ?? > ${instance.right} THEN ?? - ${width} ELSE ?? END`, ['left', 'left', 'left']),
        right: Database.raw(`?? - ${width}`, ['right'])
      });

      // step 3: получаем значения родителя и выдиляем место под перемещаемый узел
      const {right, level} = await this.buildNested(instance);
      await Database.from(this.table).where('right', '>=', right).update({
        left: Database.raw(`CASE WHEN ?? > ${right} THEN ?? + ${width} ELSE ?? END`, ['left', 'left', 'left']),
        right: Database.raw(`?? + ${width}`, ['right'])
      });

      // step 4: отрицательные значения заменяем положительными
      await Database.from(this.table).where('left', '<', 0).where('right', '<', 0).update({
        left: Database.raw(`0 - ?? - ${instance.left} + ${right}`, ['left']),
        right: Database.raw(`0 - ?? - ${instance.left} + ${right}`, ['right']),
        level: Database.raw(`?? - ${instance.level} + ${level} + 1`, ['level'])
      });
    }
  }

  buildNested = async (instance) => {
    let left = 1;
    let right = 2;
    let level;

    let parent;
    const { parent_id } = instance;
    if(parent_id) {
      parent = await Database.from(this.table).where('id', parent_id).first();
    }

    if (parent) {
      left = parent.left;
      right = parent.right;
      level = parent.level;
    } else {
      let count = await Database.from(this.table).getCount();

      count = parseInt(count) + 1;
      right = count * 2 || right;
    }

    return {
      left,
      right,
      level,
      parent
    };
  }
}

module.exports = NestedSet;
