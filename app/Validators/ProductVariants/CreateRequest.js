'use strict'

class ProductVariantsCreateRequest {
  async authorize () {
    return true;
  }
  
  get rules () {
    return {
      // validation rules
    }
  }
}

module.exports = ProductVariantsCreateRequest
