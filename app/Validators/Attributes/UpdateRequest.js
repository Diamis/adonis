'use strict'

class AttributesUpdateRequest {
  async authorize () {
    return true;
  }
  
  get rules () {
    return {
      // validation rules
    }
  }
}

module.exports = AttributesUpdateRequest
