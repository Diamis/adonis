'use strict'

class ProductVariantsDeleteRequest {
  async authorize () {
    return true;
  }
  
  get rules () {
    return {
      // validation rules
    }
  }
}

module.exports = ProductVariantsDeleteRequest
