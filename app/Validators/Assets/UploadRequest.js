'use strict'

const Config = use('Config');


class AssetsUploadRequest {
  async authorize () {
    return true;
  }

  get rules () {
    const max = Config.get('assets.maxFileSize');
    
    return {
      file: `required_without_all:url|max:${max}`,
      url:  'required_with:url|required_without_all:file'
    }
  }
  
  get messages () {
    return {}
  }
}

module.exports = AssetsUploadRequest
