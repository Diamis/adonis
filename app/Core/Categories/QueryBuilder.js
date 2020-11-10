"use script";

const Model = use("Model");
const Database = use("Database");

class QueryBuilder extends Model {
  static async createNested(data) {
    const { parent_id } = data;
    const table = this.table;

    let right = 0;

    if (parent_id) {
      const instance = await Database.table(table)
        .select("rgt")
        .where("id", parent_id)
        .first();

      right = instance ? instance.rgt + 1 : 0;
    } else {
      const maxRight = await Database.table(table).getMax("rgt");
      right = maxRight + 1;
    }

    await Database.table(table).where("lft", ">", right).increment("lft", 2);
    await Database.table(table).where("rgt", ">=", right).increment("rgt", 2);

    return super.create({ ...data, lft: right, rgt: right + 1 });
  }
}

module.exports = QueryBuilder;
