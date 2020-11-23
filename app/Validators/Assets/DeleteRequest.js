'use strict';

class AssetsDeleteRequest {
  async authorize () {
    return true;
  }
  
  get rules () {
    return {
      id: 'required:integer'
    }
  }

  get messages () {
    return {}
  }
}

module.exports = AssetsDeleteRequest
