'use strict'

class CategoriesDeleteRequest {
  get validateAll () {
    return true
  }

  get formatter () {
    return formatters.JsonApi
  }

  get rules () {
    return {}
  }
}

module.exports = CategoriesDeleteRequest
