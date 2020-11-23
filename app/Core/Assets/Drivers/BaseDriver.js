"use script";
 
class BaseDriver {
  static get handle(){
    throw new Error('You have to implement the method "static get handle"');
  }

  async process() {};
  async prepare() {};
}

module.exports =BaseDriver;