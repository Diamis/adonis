'use strict';

const { formatters  } = use('Validator');

class CategoriesUpdateRequest {
  get validateAll () {
    return true
  }

  get formatter () {
    return formatters.JsonApi
  }

  get rules () {
    return {
      parent_id: 'integer',
      name: 'string',
      slug: 'string'
    }
  } 
}

module.exports = CategoriesUpdateRequest
