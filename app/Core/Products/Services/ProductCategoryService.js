"use script";

const Product = use("App/Core/Products/Models/Product");

class ProductCategoryService {
  constructor(product) {
    if(!(product instanceof Product)) {
      throw new Error('error');
    }

    this.product = product
  }

  async attach() { console.log('ProductCategoryService.attach'); }
  async update() { console.log('ProductCategoryService.update'); }
  async delete() { console.log('ProductCategoryService.delete'); }

  set product(value) {
    this._product = value;
  }

  get product() {
    return this._product;
  }
}

module.exports = ProductCategoryService;
