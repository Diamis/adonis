"use script";

const Attribute = use("App/Core/Attributes/Models/Attribute");

class AttributeService {
  constructor() {
    this._model = new Attribute();
  }

  /**
   * @method create
   * 
   * @param {Object}    data 
   * @param {string}    data.type
   * @param {string}    data.name
   * @param {number}    data.sort
   * @param {string}    data.validation
   * @param {boolean}   data.is_required
   * @param {boolean}   data.is_filterable
   * @param {Object[]}  data.options
   * @param {string}    data.options[].label
   * @param {string}    data.options[].value
   * @param {any}       data.defaultValue
   * 
   * @return {Promise<Model>}
   */
  async create(data) {
    const { options, defaultValue, ...rest } = data;
    const settings = { options, defaultValue };
    const insertData = { ...rest, settings };
    if(defaultValue && options && !options.find(opt => opt.value === defaultValue)) {
      throw new Error("Значение defaultValue не найдено в переданом списке options");
    }
    
    return Attribute.create(insertData);
  }

  async update(id, data) {
    const model = await Attribute.find(id);
    await model.merge(data);
    return model;
  }

  async delete(id) {
    const model = await Attribute.find(id);
    await model.delete();
  }

  get model() {
    return this._model;
  }
}

module.exports = AttributeService;
