'use strict';

const { formatters } = use('Validator');

class AttributesCreateGroupRequest {
  async authorize() {
    return true;
  }

  get formatter() {
    return formatters.JsonApi;
  }

  get rules() {
    return {
      name: 'string',
      sort: 'integer',
      options: 'array',
      'options.*.label': 'string',
      is_required: 'boolean',
    };
  }
}

module.exports = AttributesCreateGroupRequest;
