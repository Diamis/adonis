'use strict';
const CategoryService = use("App/Core/Categories/Services/CategoryService");
const Console = require("../../../../test/unit/utils")

class CategoryMutateController {
  async store({ request, response }) {
    const data = request.all();
    const category = await CategoryService.create(data);
    return response.status(200).send(category);
  }

  async update({ params: { categoryId }, request, response }) {
    const data = request.all();
    const category = await CategoryService.findById(categoryId);
    
    category.merge(data);
    await category.save();

    const tree = await CategoryService.getTree();
    Console.log(tree, true);

    return response.status(200).send('update');
  }

  async delete({ params: { categoryId }, response }) {
    await CategoryService.delete(categoryId);
    return response.status(204).send();
  }
}

module.exports = CategoryMutateController
