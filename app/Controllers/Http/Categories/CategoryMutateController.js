'use strict';
const CategoryService = use("App/Core/Categories/Services/CategoryService");

class CategoryMutateController {
  async store({ request, response }) {
    const data = request.all();
    const category = await CategoryService.create(data);
    return response.status(200).send(category);
  }

  async update() {
    return 'update';
  }

  async delete() {
    return 'delete';
  }

}

module.exports = CategoryMutateController
