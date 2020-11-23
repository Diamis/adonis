'use strict'

class CategoriesUpdateRequest {
  get validateAll () {
    return true
  }

  get formatter () {
    return formatters.JsonApi
  }

  get rules () {
    return {
      // validation rules
    }
  }
}

module.exports = CategoriesUpdateRequest
