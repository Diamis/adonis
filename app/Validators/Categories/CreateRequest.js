'use strict'

const { sanitizor, formatters  } = use('Validator')

class CategoriesCreateRequest {
  get validateAll () {
    return true
  }

  get formatter () {
    return formatters.JsonApi
  }

  get sanitizationRules () {
    return {
      slug: 'slug'
    }
  }

  get rules () {
    return {
      name: 'required|string',
      parent_id: 'integer'
    }
  }

  get messages () {
    return {
      'name.required': 'You must provide a field "name"',
      'name.string': 'This "name" must is string',
      'parent_id.integer': 'This "parent_id" must is integer'
    }
  }

  get data() {
    const requestBody = this.ctx.request.all() || {};
    return Object.assign(requestBody, {
      slug: sanitizor.slug(requestBody.slug || requestBody.name)
    });
  }
}

module.exports = CategoriesCreateRequest
