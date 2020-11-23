'use strict';

const Route = use('Route');

/*
* Product variants
*/
Route.post('products/variants', '').validator(null);
Route.put('products/variants/{productId}', '').validator(null);
Route.delete('products/variants/{productId}', '').validator(null);
Route.get('products/{productId}/variants', '').validator(null);

/*
* Products
*/
Route.post('products', '').validator(null);
Route.put('products/{productId}', '').validator(null);
Route.delete('products/{productId}', '').validator(null);
Route.post('products/{productId}/assets', '').validator(null);
Route.post('products/{productId}/attributes', '').validator(null);
Route.post('products/{productId}/categories', '').validator(null);
Route.post('products/{productId}/drafts', '').validator(null);
Route.post('products/{productId}/publish', '').validator(null);