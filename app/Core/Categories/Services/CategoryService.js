'use script';

const Category = require('../Models/Category');

class CategoryService {
  constructor() {
    this.model = new Category();
  }

  findById(id, includes = []) {
    let query = this.model.query();
    query = this.withIncludes(query, includes);

    return query.find(id);
  }

  getNestedList() {
    return this.model;
  }

  getByParentId(parentId, includes = []) {
    let query = this.model.query();
    query = this.withIncludes(query, includes);
    query.where('parent_id', parentId);

    return query.fetch();
  }

  create(data) {
    const category = this.model;
    console.log('category create [data]', data);
  }

  update(data) {
    console.log('category update [data]', data);
  }

  delete(id) {
    const category = this.findById(id);
    category.delete();

    console.log('category delete [id]', id);
  }

  getCategoryTree() {}

  withIncludes(query, includes) {
    for(const name of includes) {
      query.with(name);
    }
    return query;
  }
}

module.exports =CategoryService;
