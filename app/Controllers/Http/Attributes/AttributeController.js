'use strict';

const AttributeService = use("App/Core/Attributes/Services/AttributeService");

class AttributeController {
  async store({ request, response }) {
    const data = request.all();
    const service = new AttributeService();
    const attribute = await service.create(data);
    return response.status(201).send(attribute);
  }

  async update({ params: { attributeId }, request, response }) {
    const data = request.all();
    const service = new AttributeService();
    const attribute = await service.update(attributeId, data);
    return response.status(200).send(attribute);
  }

  async delete({ params: { attributeId }, response }) {
    const service = new AttributeService();
    await service.delete(attributeId);
    return response.status(204).send();
  }
}

module.exports = AttributeController
