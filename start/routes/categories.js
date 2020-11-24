'use strict';

const Route = use('Route');

Route.post('categories', 'Categories/CategoryMutateController.store').validator('Categories/CreateRequest');
Route.put('categories/:categoryId', 'Categories/CategoryMutateController.update').validator('Categories/UpdateRequest');
Route.delete('categories/:categoryId', 'Categories/CategoryMutateController.delete').validator('Categories/DeleteRequest');

Route.get('categories', 'Categories.CategoryController.index');
Route.get('categories/{categoryId}', 'Categories.CategoryController.index');
Route.get('categories/{categoryId}/draft', 'Categories.CategoryController.draft');
Route.get('categories/{categoryId}/parent', 'Categories.CategoryController.parent');
Route.get('categories/{categoryId}/products', 'Categories.CategoryController.products');
Route.get('categories/{categoryId}/children', 'Categories.CategoryController.children');
