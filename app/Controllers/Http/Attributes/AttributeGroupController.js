'use strict';

const AttributeGroupService = use('App/Core/Attributes/Services/AttributeGroupService');

class AttributeGroupService {
  async index({ request, response }) {
    return response.status(200).send({});
  }

  async store({ request, response }) {
    const data = request.all();
    const serviceGroup = new AttributeGroupService();
    const group = await serviceGroup.create(data);
    return response.status(201).send(group);
  }

  async update({ params: { attributeId }, request, response }) {
    const data = request.all();
    const serviceGroup = new AttributeGroupService();
    const group = await serviceGroup.update(attributeId, data);
    return response.status(200).send(group);
  }

  async delete({ params: { attributeId }, response }) {
    const serviceGroup = new AttributeGroupService();
    await serviceGroup.delete(attributeId);
    return response.status(204).send();
  }
}

module.exports = AttributeGroupService;
