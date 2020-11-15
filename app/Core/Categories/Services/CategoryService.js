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
  static async getList(select = ["*"]) {
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
  static async getTree(param = {}) {
    const { id = null, select = ['*'] } = param;
    let data = [];
    let model;

    const buildSelect = ['id', 'parent_id', ...select];
    if(id) {
      model = await Category.find(id);
    }

    if(model) {
      data = (await model.children(buildSelect)).toJSON();
    } else {
      data = await CategoryService.getList(buildSelect);
    }

    return utils.arrayToTree(data);
  }

  /**
   * Получает модель
   * @method findById
   * @param {Number} id
   * @returns {Promise<Model|Null>}
   */
  static async findById(id) {
    if(!id) {
      throw new Error("Property id of undefined");
    }

    const model = await Category.find(id);
    if(!model) {
      throw new Error(`Category with id=${id} property not found`)
    }

    return model;
  }

  static async create(params) {
    let { slug, name, sort = 0, parentId } = params;

    if (!slug && name) {
      slug = Translate.toLatin(name);
    }

    if(parentId) {
      await CategoryService.findById(parentId);
    }

    return Category.create(objectToSnakeCase({
      name,
      slug,
      sort,
      parentId,
    }));
  }

  // TODO Реализовать перемещения катерогии Nested sets
  async update(data) {
    console.log("category update [data]", data);
  }

  static async delete(id) {
    const model = await CategoryService.findById(id);
    return model.delete();
  }
}

module.exports = CategoryService;
