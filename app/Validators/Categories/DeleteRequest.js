'use strict'

class CategoriesDeleteRequest {
  async authorize () {
    return true;
  }
  
  get rules () {
    return {
      // validation rules
    }
  }
}

module.exports = CategoriesDeleteRequest
