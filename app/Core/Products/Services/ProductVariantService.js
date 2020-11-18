"use script";

const Product = use("App/Core/Products/Models/Product");
const ProductVariant = use("App/Core/Products/Models/ProductVariant");

class ProductVariantService {
  /**
   * Creates variants for a product
   * 
   * @param {Number} id 
   * @param {Array<Object>} variants
   * @returns App/Core/Products/Models/Product
   */
  async insert(id, variants) {
    const product = await Product.find(id);
    const data = [];

    for(const variant of variants) {
      const params = this.validate(variant); 
      data.push(params);
    }

    await product.variants().insert(data);
    await product.load('variants');

    return product;
  }

  /**
   * Creates variant for a product
   *
   * @param {Number} id
   * @param {Object} data
   * @returns App/Core/Products/Models/Product
   */
  async create(id, data) {
    const params = this.validate(data);
    const product = await Product.find(id);

    await product.variants().create(params);

    await product.load('variants');
 
    return product;
  }

  /**
   * Updates a resource from the given data
   *
   * @param {Number} id
   * @param {Object} data
   * @returns App/Core/Products/Models/Product
   */
  async update(id, data) {
    const variant = await ProductVariant.find(id);

    variant.fill(data);

    await variant.save();

    return variant.product();
  }

  /**
   * Deletes a resource by its given ID
   *
   * @param {Number} id
   * @returns App/Core/Products/Models/Product
   */
  async delete(id) {
    const variant = await ProductVariant.find(id);
    return variant.delete();
  }

  validate(data) {
    const { price, min_qty, unit_qty } = data;
    return {
      price, 
      min_qty, 
      unit_qty
    }
  }
}

module.exports = ProductVariantService;
