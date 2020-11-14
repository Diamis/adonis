'use strict'

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const CategoryService = use("App/Core/Categories/Services/CategoryService");
const { seedData } = require("../../test/data/categories");


class CategorySeeder {
  async run () {
    for(const ctg of seedData) {
      await CategoryService.create(ctg);
    }
  }
}

module.exports = CategorySeeder
