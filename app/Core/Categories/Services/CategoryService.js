"use script";

const Translit = use("App/Core/Helpers/Translit");
const toSnakeCase = use("App/Core/Helpers/StringCase").objectToSnakeCase;
const Category = use("App/Core/Categories/Models/Category");

class CategoryService {
  constructor() {
    this.model = Category;
  }

  findById(id, includes = []) {
    let query = this.model.query();
    query = this.withIncludes(query, includes);

    return query.find(id);
  }

  async getList() {
    return this.model.query().fetch();
  }

  getByParentId(parentId, includes = []) {
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
    console.log("category create [category]", category);
  }

  update(data) {
    console.log("category update [data]", data);
  }

  delete(id) {
    const category = this.findById(id);
    category.delete();

    console.log("category delete [id]", id);
  }

  getCategoryTree() {}

  withIncludes(query, includes) {
    for (const name of includes) {
      query.with(name);
    }
    return query;
  }
}

module.exports = CategoryService;
