'use strict'

class CategoriesCreateRequest {
  async authorize () {
    return true;
  }
  
  get rules () {
    return {
      // validation rules
    }
  }
}

module.exports = CategoriesCreateRequest
