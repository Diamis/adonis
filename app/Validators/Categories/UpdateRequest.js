'use strict'

class CategoriesUpdateRequest {
  async authorize () {
    return true;
  }
  
  get rules () {
    return {
      // validation rules
    }
  }
}

module.exports = CategoriesUpdateRequest
