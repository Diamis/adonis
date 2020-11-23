"use script";
 
const BaseDrive = use('App/Core/Assets/Drivers/BaseDriver');

class YouTube extends BaseDrive {
  static get handle() {
    return 'youtube';
  }
  
  constructor(){
    super();
  }
}

module.exports = YouTube;