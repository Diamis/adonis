"use script";

const Model = use("Model"); 

class Asset extends Model {
  static get table() {
    return 'assets';
  }

  /**
   * RELATIONS
   * --------------------------------
   */
  source() {
    return this.belongsTo('App/Core/Assets/Modules/AssetSource', 'asset_source_id', 'id');
  }
}

module.exports = Asset;