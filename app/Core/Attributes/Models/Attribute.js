"use script";

const Model = use("Model");

/**
 * Class Attribute
 * 
 * @property string         name
 * @property integer        sort
 * @property boolean        requierd
 * @property array          type
 * @property jsonb          settings
 * 
 * @property-read integer   id
 * @property-read datetime  created_at
 * @property-read datetime  updated_at
 */
class Attribute extends Model {
  static boot() {
    super.boot();
    this.addTrait('NoTimestamp');
  }


  static get hidden () {
    return ['created_at', 'updated_at'];
  }

  static get types() {
    return [
      "text",
      "textarea",
      "select",
      "multiselect",
      "radio",
      "checkbox",
      "datetime",
      "date",
      "time",
      "switch",
      "number"
    ];
  }

  static get validations() {
    return ["decimal"]
  }

  category() {
    return this.belongsToMany('App/Core/Categories/Models/Category')
      .pivotTable('category_attributes');
  }
}

module.exports = Attribute;
