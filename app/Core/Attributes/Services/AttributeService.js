"use script";

const Attribute = use("App/Core/Attributes/Models/Attribute");

class AttributeService {
  constructor() {
    this._model = new Attribute();
  }

  async create(data) {
    return Attribute.create(data);
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
