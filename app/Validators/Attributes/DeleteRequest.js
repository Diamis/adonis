'use strict'

class AttributesDeleteRequest {
  async authorize () {
    return true;
  }
  
  get rules () {
    return {
      // validation rules
    }
  }
}

module.exports = AttributesDeleteRequest
