"use script";
 
const Asset = use("App/Core/Assets/Models/Asset");

class AssetService {
  /**
   * Uploads an asset.
   * 
   * @param {Object} data
   * @returns \App\Core\Assets\Modules\Asset
   */
  async upload(data) {
    const driver = this.getDriver();
    const asset = await driver.process(data)

    return asset
  }


  /**
   * Update at asset.
   * 
   * @param {Object} data 
   * @returns \App\Core\Assets\Modules\Asset
   */
  async update(data) {
    const { id, ...rest } = data;
    const asset = await Asset.find(id);

    asset.fill(rest);
    await asset.save();

    return asset;
  }

  /**
   * Delete at asset.
   * 
   * @param {Number} id 
   * @returns {Boolean}
   */
  async delete(id) {
    const asset = await Asset.find(id);
    await asset.delete();
    return true;
  }

  /**
   * Gets the driver for the upload
   */
  getDriver() {
    return '';
  }
}

module.exports = AssetService;