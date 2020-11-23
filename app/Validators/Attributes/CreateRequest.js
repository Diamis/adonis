'use strict'

class AttributesCreateRequest {
  async authorize () {
    return true;
  }
  
  get rules () {
    return {
      // validation rules
    }
  }
}

module.exports = AttributesCreateRequest
