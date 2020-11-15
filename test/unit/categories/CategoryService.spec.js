"use strict";

const { test, trait } = use("Test/Suite")("Category");
const CategoryService = use("App/Core/Categories/Services/CategoryService");
const {
  seedDataUpdate,
  seedDataDelete,
  seedData,
  seedTree,
  seedTreeDelete,
  seedTreeUpdate
} = require("../../data/categories");

trait('DatabaseTransactions');

test("service: create | getTree", async ({ assert }) => {
  for(const ctg of seedData) {
    await CategoryService.create(ctg);
  }

  const select = ['name', 'left', 'right']
  const tree = await CategoryService.getTree({ select });

  assert.deepEqual(tree, seedTree);
}).timeout(0);

test("service: delete", async ({ assert }) => {
  for(const ctg of seedDataDelete) {
    await CategoryService.create(ctg);
  }

  await CategoryService.delete(8);

  const select = ['name', 'left', 'right']
  const tree = await CategoryService.getTree({ select });

  assert.deepEqual(tree, seedTreeDelete);
}).timeout(0);

test("service: update", async ({ assert }) => {
  for(const ctg of seedDataUpdate) {
    await CategoryService.create(ctg);
  }


}).timeout(0)
