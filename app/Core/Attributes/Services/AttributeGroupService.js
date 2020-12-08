'use script';

const Attribute = use('App/Core/Attributes/Models/Attribute');
const AttributeGroup = use('App/Core/Attributes/Models/AttributeGroup');
class AttributeGroupService {
  constructor() {
    this._model = new Attribute();
  }

  /**
   * @method create
   *
   * @param {Object}    data
   * @param {string}    data.name
   * @param {number}    data.sort
   *
   * @return {Promise<Model>}
   */
  async create(data) {}

  async update(id, data) {
    const model = await AttributeGroup.find(id);
    await model.merge(data);
    return model;
  }

  async delete(id) {
    const model = await AttributeGroup.find(id);
    await model.delete();
  }

  // getter and setter

  get model() {
    return this._model;
  }
}

module.exports = AttributeGroupService;
