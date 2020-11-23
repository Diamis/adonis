'use strict'

class ProductsDeleteRequest {
  async authorize () {
    return true;
  }
  
  get rules () {
    return {
      // validation rules
    }
  }
}

module.exports = ProductsDeleteRequest
