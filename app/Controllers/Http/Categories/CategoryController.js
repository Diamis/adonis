'use strict'

class CategoryController {
  async index() {
    return 'index';
  }

  async children() {
    return 'children';
  }

  async draft() {
    return 'children';
  }

  async parent() {
    return 'children';
  }

  async products() {
    return 'children';
  }
}

module.exports = CategoryController
