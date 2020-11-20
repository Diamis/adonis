"use script";

const BaseDrive = require('./BaseDriver');

class Image extends BaseDrive {
  static get handle() {
    return 'image';
  }

  constructor(){
    super();
  }
}

module.extends = Image;