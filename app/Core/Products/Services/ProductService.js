"use script";

const Product = use("App/Core/Products/Models/Product");

class ProductService {
  constructor() {
    this.model = new Product;
  }

  async create(params) {
    const { optionData, option, data, attributeData, ...rest } = params;
    
    const attribute_data = attributeData || data;
    const option_data = optionData || option;

    const sqlData = { 
      ...rest, 
      option_data, 
      attribute_data
    }

    const product = await this.model.create(sqlData);
    return product;    
  }

  // getters and setters
  
  get model() {
    return this._model;
  }

  set model(valule) {
    return this._model = valule;
  }
}

module.extends = ProductService;
