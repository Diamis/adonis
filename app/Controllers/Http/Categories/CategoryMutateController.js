'use strict';
const CategoryService = use("App/Core/Categories/Services/CategoryService");

class CategoryMutateController {
  async store({ request, response }) {
    const data = request.all();
    const category = await CategoryService.create(data);
    return response.status(201).send(category);
  }

  async update({ params: { categoryId }, request, response }) {
    const data = request.all();
    const category = await CategoryService.findById(categoryId);

    category.merge(data);
    await category.save();

    return response.status(200).send(category);
  }

  async delete({ params: { categoryId }, response }) {
    await CategoryService.delete(categoryId);
    return response.status(204).send();
  }
}

module.exports = CategoryMutateController
