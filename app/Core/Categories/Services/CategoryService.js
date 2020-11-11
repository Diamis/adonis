"use script";

const Translit = use("App/Core/Helpers/Translit");
const toSnakeCase = use("App/Core/Helpers/StringCase").objectToSnakeCase;
const Category = use("App/Core/Categories/Models/Category");

class CategoryService {
  constructor() {
    this.model = Category;
  }

  async getList() {
    return this.model.query().fetch();
  }

  async findById(id, includes = []) {
    let query = this.model.query();
    query = this.withIncludes(query, includes);

    return query.find(id);
  }

  async getByParentId(parentId, includes = []) {
    let query = this.model.query();
    query = this.withIncludes(query, includes);
    query.where("parent_id", parentId);

    return query.fetch();
  }

  async create(params) {
    let { slug, name, sort = 0, parentId } = params;

    if (!slug && name) {
      slug = Translit.toLatin(name);
    }

    const data = toSnakeCase({
      name,
      slug,
      sort,
      parentId,
    });

    const category = await this.model.createNested(data);

    // console.log("category", category);
    // console.log("categories", categories);
  }

  async update(data) {
    console.log("category update [data]", data);
  }

  async delete(id) {
    const category = this.findById(id);
    category.delete();

    console.log("category delete [id]", id);
  }

  async getTree() {}

  withIncludes(query, includes) {
    for (const name of includes) {
      query.with(name);
    }
    return query;
  }
}

module.exports = CategoryService;
