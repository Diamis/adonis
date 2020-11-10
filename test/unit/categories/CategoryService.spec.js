"use strict";

const faker = require("faker");
const { test } = use("Test/Suite")("Category");
const CategoryService = use("App/Core/Categories/Services/CategoryService");

test("created", async ({ assert }) => {
  const service = new CategoryService();

  const name = faker.commerce.department();

  let categories = await service.getList();
  categories = await categories.toJSON();

  const parentId = parseInt(Math.random() * categories.length) + 1;
  await service.create({
    name,
    parentId,
  });

  assert.equal(2 + 2, 4);
});

// test("update", async ({ assert }) => {
//   assert.equal(2 + 2, 4);
// });

// test("delete", async ({ assert }) => {
//   assert.equal(2 + 2, 4);
// });

// test("show children", async ({ assert }) => {
//   assert.equal(2 + 2, 4);
// });
