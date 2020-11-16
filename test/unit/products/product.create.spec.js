"use strict";

const { test, trait } = use("Test/Suite")("Product Created");
const ProductService  = use("App/Core/Products/Services/ProductService");

trait("DatabaseTransactions");

test("append properties of name and description", async() => {
  const service = new ProductService();
  const product = await service.create({ 
    name: 'product_name', 
    description: 'product description'
  });
})