'use strict'

class ProductsUpdateRequest {
  async authorize () {
    return true;
  }
  
  get rules () {
    return {
      // validation rules
    }
  }
}

module.exports = ProductsUpdateRequest
