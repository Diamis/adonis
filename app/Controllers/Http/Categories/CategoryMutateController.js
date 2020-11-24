'use strict';
const CategoryService = use("App/Core/Categories/Services/CategoryService");

class CategoryMutateController {
  async store({ request, response }) {
    const data = request.all();
    const category = await CategoryService.create(data);
    return response.status(200).send(category);
  }

  async update({ request, response }) {
    console.log('request', request)
    return response.status(200).send('update');
  }

  async delete({ params: { categoryId }, response }) {
    await CategoryService.delete(categoryId);
    return response.status(204).send();
  }
}

module.exports = CategoryMutateController
