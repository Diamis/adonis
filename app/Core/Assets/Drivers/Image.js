"use script";

const BaseDrive = use('App/Core/Assets/Drivers/BaseDriver');
class Image extends BaseDrive {
  static get handle() {
    return 'image';
  }

  constructor(){
    super();
  }
}

module.exports = Image;