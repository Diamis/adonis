"use strict";

const { test, trait } = use("Test/Suite")("Category");
const CategoryService = use("App/Core/Categories/Services/CategoryService");
const { seedData, seedTree} = require("../../data/categories");

trait('DatabaseTransactions');

test("service create | service getTree", async ({ assert }) => {
  const service = new CategoryService();

  for(const ctg of seedData) {
    await service.create(ctg);
  }

  const tree = await service.getTree({
    select: ['name', 'parent_id', 'left', 'right']
  });

  assert.deepEqual(tree, seedTree);
}).timeout(0);
