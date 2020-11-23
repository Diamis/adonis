"use script";

const Model = use("Model");

class AssetSource extends Model {
  static get table() {
    return 'asset_sources';
  }

  /**
   * RELATIONS
   * --------------------------------
   */
  assets() {
    return this.hasMany('App/Core/Assets/Modules/Asset', 'id', 'asset_source_id');
  }
}

module.exports = AssetSource;