"use script";

const Model = use("Model");
const Database = use("Database");

// tmp see
// https://github.com/sequelize/sequelize/issues/3532#issuecomment-92764582

class QueryBuilder extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeCreate", this.beforeCreate);
    // this.addHook("beforeDelete", this.afterDelete);
    this.addHook("afterDelete", this.afterDelete);
    // this.addHook("afterSave", this.insertAfterNode);
    // this.addHook("afterCreate", this.insertAfterCreateAndUpdateNode);
    // this.addHook("afterUpdate", this.insertAfterCreateAndUpdateNode);
  }

  /**
   * Before creating a new record.
   */
  static async beforeCreate(instance) {
    const { left = 1, right = 2 } = instance;
    const sql = QueryBuilder.query();

    sql.where("left", ">=", left).increment("left", 2);
    sql.where("right", ">=", right).increment("right", 2);

    instance.left = left;
    instance.right = right;
  }

  static async afterDelete(instance) {
    const { left, right } = instance;
    const width = right - left + 1;
    const sql = QueryBuilder.query();

    sql.where("left", ">=", left).decrement("left", width);
    sql.where("right", ">=", right).decrement("right", width);
  }

  /**
   *  After a new record has been created or updated.
   */
  static async insertAfterNode() {
    instance.assertNodeExists();
  }

  createWithParent() {}

  buildWithParent() {}

  findParent(instance) {
    const { left, right } = instance;
    return this.query()
      .select("id")
      .where("left", left)
      .where("right", right)
      .orderBy("id", "DESC");
  }

  query() {
    return Database.table(this.table).query();
  }

  static async createNested(data) {
    const table = this.table;
    const { parent_id, children = [] } = data;

    // let right = 0;

    // if (parent_id) {
    //   const instance = await Database.table(table)
    //     .select("rgt")
    //     .where("id", parent_id)
    //     .first();

    //   right = instance ? instance.rgt + 1 : 0;
    // } else {
    //   const maxRight = await Database.table(table).getMax("rgt");
    //   right = maxRight + 1;
    // }

    // await Database.table(table).where("lft", ">", right).increment("lft", 2);
    // await Database.table(table).where("rgt", ">=", right).increment("rgt", 2);

    const mod = await super.create({ ...data });
    await mod.delete();
  }

  static queryInsert() {
    const table = this.table;
    // The nested set model has an implied ordering of
    // siblings that the adjacency list model does not.
    // To insert a new node as the rightmost sibling:
    const query = `
      BEGIN DECLARE right_most_sibling INTEGER;
       
        SET right_most_sibling = (SELECT right FROM ${table} WHERE id=:your);

        UPDATE ${table}
          SET left  = CASE WHERE left > right_most_sibling
                            THEN  left + 2
                            ELSE  left END,
              right = CASE WHERE right >= right_most_sibling
                            THEN  right + 2
                            ELSE  right END
        WHERE right >= right_most_sibling;

        INSERT INTO ${table} (left, right)
        VALUES (right_most_sibling, right_most_sibling + 1)
      END;
    `;
  }
}

module.exports = QueryBuilder;
