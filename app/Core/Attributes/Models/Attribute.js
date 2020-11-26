"use script";

const Model = use("Model");

class Attribute extends Model {
  static get hidden () {
    return ['created_at', 'updated_at'];
  }

  static get types() {
    return [
      "text",
      "textarea",
      "select",
      "radio",
      "checkbox",
      "date",
      "time",
      "switch",
      "number"
    ];
  }
}

module.exports = Attribute;
