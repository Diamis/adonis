'use strict';

const Route = use('Route');

Route.post('categories', '').validator(null);
Route.put('categories/{categoryId}', '').validator(null);
Route.delete('categories/{categoryId}', '').validator(null);

Route.get('categories', 'Categories.CategoryController.index');
Route.get('categories/{categoryId}', '');
Route.get('categories/{categoryId}/parent', '');
Route.get('categories/{categoryId}/products', '');
Route.get('categories/{categoryId}/children', 'Categories.CategoryController.children');