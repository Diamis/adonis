"use script";

const utils = use("App/Core/Categories/utils");
const Translate = use("App/Core/Helpers/Translate");
const Category = use("App/Core/Categories/Models/Category");
const { objectToSnakeCase } = use("App/Core/Helpers/StringCase");

class CategoryService {
  constructor() {}

  /**
   * Возвращает список в виде массива
   * @param {Array} select
   * @returns {Promise<Response>}
   */
  async getList(select = ["*"]) {
    const category = await Category.query()
                                   .select(...select)
                                   .orderBy('parent_id', 'asc')
                                   .orderBy('id', 'asc')
                                   .fetch();

    return category ? category.toJSON() : [];
  }

  /**
   * Возвращает массив дерева
   * @method getTree
   * @param {object} param
   * @param {Number|undefined} param.id
   * @param {Array<string>|undefined} param.select
   *
   * @returns {Array} tree
   */
  async getTree(param = {}) {
    const { id = null, select = ['*'] } = param;
    let tree = [];
    let model;

    const buildSelect = ['id', 'parent_id', ...select];
    if(id) {
      model = await Category.find(id);
    }

    if(model) {
      tree = (await model.children(buildSelect)).toJSON();
    } else {
      tree = await this.getList(buildSelect);
    }

    return utils.reduceTree(tree);
  }

  /**
   * Получает модель
   * @method findById
   * @param {Number} id
   * @returns {Promise<Model|Null>}
   */
  async findById(id) {
    return Category.find(id);
  }

  async create(params) {
    let { slug, name, sort = 0, parentId } = params;

    if (!slug && name) {
      slug = Translate.toLatin(name);
    }

    return Category.create(objectToSnakeCase({
      name,
      slug,
      sort,
      parentId,
    }));
  }

  async update(data) {
    console.log("category update [data]", data);
  }

  async delete(id) {
    console.log("category delete [id]", id);
  }
}

module.exports = CategoryService;
