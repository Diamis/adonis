'use strict'

class ProductVariantsUpdateRequest {
  async authorize () {
    return true;
  }
  
  get rules () {
    return {
      // validation rules
    }
  }
}

module.exports = ProductVariantsUpdateRequest
