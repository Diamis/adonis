"use script";
 
const BaseDrive = require('./BaseDriver');

class YouTube extends BaseDrive {
  static get handle() {
    return 'youtube';
  }
  
  constructor(){
    super();
  }
}

module.extends = YouTube;