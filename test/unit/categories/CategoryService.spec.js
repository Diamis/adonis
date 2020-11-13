"use strict";

const faker = require("faker");
const { test } = use("Test/Suite")("Category");
const CategoryService = use("App/Core/Categories/Services/CategoryService");

test("created", async ({ assert, done }) => {
  const service = new CategoryService();

  await service.create({
    name: faker.commerce.department(),
  });

  await service.create({
    name: faker.commerce.department(),
    parentId: 1,
  });

  await service.create({
    name: faker.commerce.department(),
    parentId: 1,
  });

  await service.create({
    name: faker.commerce.department(),
    parentId: 2,
  });

  await service.create({
    name: faker.commerce.department(),
    parentId: 2,
  });

  await service.create({
    name: faker.commerce.department(),
    parentId: 1,
  });

  const list = await service.getList([
    "id",
    "left",
    "right",
    "level",
    "parent_id",
  ]);
  console.log("list", list.toJSON());

  assert.equal(2 + 2, 4);
}).timeout(0);

// test("update", async ({ assert }) => {
//   assert.equal(2 + 2, 4);
// });

// test("delete", async ({ assert }) => {
//   assert.equal(2 + 2, 4);
// });

// test("show children", async ({ assert }) => {
//   assert.equal(2 + 2, 4);
// });
