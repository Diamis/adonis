"use script";

const { sanitizor } = use('Validator')
const utils = use("App/Core/Categories/utils");
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
      .orderBy("parent_id", "asc")
      .orderBy("id", "asc")
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
    const { id = null, select = ["*"] } = param;
    let data = [];
    let model;

    const buildSelect = ["id", "parent_id", ...select];
    if (id) {
      model = await Category.find(id);
    }

    if (model) {
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
   * @param {Object|undefined} param
   * @returns {Promise<Model|Null>}
   */
  static async findById(id, param = {}) {
    if (!id) {
      throw new Error("Property id of undefined");
    }

    const { select = ['*'] } = param;
    const model = await Category.query().select(...select).where('id', id).first();
    if (!model) {
      throw new Error(`В таблице "categories" строка с ключем ${id} не найдена`);
    }

    return model;
  }

  static async create(params) {
    let { slug, name, sort = 0, parentId = 0, data, children, attributeData } = params;

    if(!slug && name) {
      slug = sanitizor.slug(name);
    }

    if (parentId) {
      await CategoryService.findById(parentId);
    }

    const category = await Category.create(
      objectToSnakeCase({
        name,
        slug,
        sort,
        parentId,
        attributeData: attributeData || data,
      })
    );

    if(children) {
      await CategoryService.createChildren(category.id, children)
      return CategoryService.findById(category.id);
    }

    return category;
  }

  static async createChildren(parentId, params) {
    if(!parentId){
      throw new Error('Для добавления дочерней категории укажите parentId');
    }

    if(!Array.isArray(params)) {
      throw new Error('Параметры должны передоваться в массиве');
    }

    for(const param of params) {
      await CategoryService.create({ ...param, parentId });
    }
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
