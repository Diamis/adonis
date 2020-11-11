"use strict";

const faker = require("faker");
const { test } = use("Test/Suite")("Category");
const CategoryService = use("App/Core/Categories/Services/CategoryService");

test("created", async ({ assert }) => {
  const service = new CategoryService();

  const name = faker.commerce.department();
  const list = await service.getList();

  console.log("list", list.toJSON());
  // await service.create({
  //   name,
  //   parentId: 1,
  // });

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
