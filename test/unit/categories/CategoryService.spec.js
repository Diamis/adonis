"use strict";

const { test, trait } = use("Test/Suite")("Category");
const CategoryService = use("App/Core/Categories/Services/CategoryService");
const { seedData, seedTree} = require("../../data/categories");

trait('DatabaseTransactions');

test("service: create | getTree", async ({ assert }) => {
  for(const ctg of seedData) {
    await CategoryService.create(ctg);
  }

  const tree = await CategoryService.getTree({
    select: ['name', 'left', 'right']
  });

  assert.deepEqual(tree, seedTree);
}).timeout(0);

test("service: delete", async ({ assert }) => {
  const ids = [];
  for(const ctg of seedData) {
    const model = await CategoryService.create(ctg);
    ids.push(model.id);
  }

  const index = parseInt(ids.length/2);
  const id = ids[index];

  await CategoryService.delete(id);

  // assert.deepEqual(tree, seedTree);
}).timeout(0);
