'use strict';

const { formatters } = use('Validator');

class AttributesUpdateGroupRequest {
  async authorize() {
    return true;
  }

  get formatter() {
    return formatters.JsonApi;
  }

  get rules() {
    return {};
  }
}

module.exports = AttributesUpdateGroupRequest;
