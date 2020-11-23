"use strict";

const { test, trait } = use("Test/Suite")("Category");
const CategoryService = use("App/Core/Categories/Services/CategoryService");
const {
  seedDataUpdate,
  seedDataDelete,
  seedData,
  seedTree,
  seedTreeDelete,
} = require("../../data/categories");

trait("DatabaseTransactions");

test("service: create | getTree", async ({ assert }) => {
  for (const ctg of seedData) {
    await CategoryService.create(ctg);
  }

  const select = ["name", "left", "right"];
  const tree = await CategoryService.getTree({ select });

  assert.deepEqual(tree, seedTree);
}).timeout(0);

test("service: remove model", async ({ assert }) => {
  for (const ctg of seedDataDelete) {
    await CategoryService.create(ctg);
  }

  await CategoryService.delete(8);

  const select = ["name", "left", "right"];
  const tree = await CategoryService.getTree({ select });

  assert.deepEqual(tree, seedTreeDelete);
}).timeout(0);

test("service: update name and attribute_data", async ({ assert }) => {
  let model;
  for (const ctg of seedDataUpdate) {
    model = await CategoryService.create({...ctg, data: { create: 'CREATE'} });
  }

  model.name = 'name-update'
  model.attribute_data = { update: "UDATE" };
  await model.save();

  const data = (await CategoryService.findById(model.id, { select: ['name', 'attribute_data' ]})).toJSON();
  assert.deepEqual(data, { name: 'name-update', attribute_data: { update: 'UDATE' } });
}).timeout(0);

test("service: create attibute_data", async ({ assert }) => {
  await CategoryService.create({
    name: "append data",
    data: { attribute: "string" },
  });

  const list = await CategoryService.getList(["name", "attribute_data"]);
  assert.deepEqual(list, [{ name: "append data", attribute_data: { attribute: "string" } }]);
});
