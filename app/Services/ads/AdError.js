"use strict";

class AdError {
  error;
  code = "AD_ERROR";
  message = "Неизвестная ошибка";

  /**
   * @param {string} error
   * @param {string} message
   * @param {number} statusCode
   */
  constructor(error, message, statusCode) {
    this.error = error;
    this.message = message;
    this.statusCode = statusCode;
  }

  toString() {
    return [this.message, "(", this.error, ")", this.statusCode].join("");
  }
}

module.exports = AdError;
