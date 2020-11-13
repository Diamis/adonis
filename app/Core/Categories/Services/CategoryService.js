"use script";

const Translit = use("App/Core/Helpers/Translit");
const toSnakeCase = use("App/Core/Helpers/StringCase").objectToSnakeCase;
const Category = use("App/Core/Categories/Models/Category");

class CategoryService {
  constructor() {}

  async getList(select = ["*"]) {
    return await Category.query()
      .select(select)
      .orderBy("parent_id", "asc")
      .fetch();
  }

  async findById(id, includes = []) {
    // let query = this.model.query();
    // query = this.withIncludes(query, includes);
    // return query.find(id);
  }

  async getByParentId(parentId, includes = []) {
    // let query = this.model.query();
    // query = this.withIncludes(query, includes);
    // query.where("parent_id", parentId);
    // return query.fetch();
  }

  async create(params) {
    let { slug, name, sort = 0, left, right, parentId } = params;

    if (!slug && name) {
      slug = Translit.toLatin(name);
    }

    const data = toSnakeCase({
      name,
      slug,
      sort,
      left,
      right,
      parentId,
    });

    const category = await Category.create(data);
  }

  async update(data) {
    console.log("category update [data]", data);
  }

  async delete(id) {
    console.log("category delete [id]", id);
  }

  async getTree() {}
}

module.exports = CategoryService;
