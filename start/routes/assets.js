'use strict';

const Route = use('Route');

Route.post('assets', 'Assets.AssetController.upload').validator('Assets.UploadRequest');
Route.delete('assets/{assetId}', 'Assets.AssetController.delete').validator('Assets.DeleteRequest');