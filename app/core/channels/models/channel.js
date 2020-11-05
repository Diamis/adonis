"use strict";

const Model = use("Model");

class Channel extends Model {
  /**
   * @method products
   * @return {Object}
   */
  products() {
    return this.belongsToMany();
  }

  /**
   * @method categories
   * @return {Object}
   */
  categories() {
    return this.belongsToMany();
  }
}

module.exports = Channel;
