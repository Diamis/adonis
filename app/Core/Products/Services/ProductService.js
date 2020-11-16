"use script";

const Product = use("App/Core/Products/Models/Product");
const ProductVariantService = use("App/Core/Products/Services/ProductVariantService");

class ProductService {
  constructor() {
    this.model = new Product();
  }

  /**
   *
   * @param {Object} params
   * @param {Object|undefined} options
   * @returns Product
   */
  async create(params, options) {
    const {
      price,
      minQty = 1,
      unitQty = 1,
      optionData,
      option,
      data,
      attributeData,
      ...rest
    } = params;

    const attribute_data = attributeData || data;
    const option_data = optionData || option;

    const sqlData = {
      ...rest,
      option_data,
      attribute_data
    }

    const product = await Product.create(sqlData);
    const variant = new ProductVariantService();

    await variant.createVariant(product, {
      price,
      attribute_data,
      min_qty: minQty,
      unit_qty: unitQty
    });

    return product;
  }

  /**
   * Creates a product variant.
   *
   * @param {Product} product
   * @param {Object} data
   * @returns {Promise<Product>}
   */
  async createVariant(product, data) {
    return this.variant.create(product, data);
  }

  // getters and setters

  get model() {
    return this._model;
  }

  set model(value) {
    return this._model = value;
  }

  get variant() {
    return this._variant;
  }

  set variant(value) {
    return this._variant = value;
  }
}

module.exports = ProductService;
