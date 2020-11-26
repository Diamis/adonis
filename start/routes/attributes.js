'use strict';

const Route = use('Route');

Route.post('attributes', 'Attributes/AttributeController.store').validator('Attributes/CreateRequest');
Route.put('attributes/:attributeId', 'Attributes/AttributeController.update').validator('Attributes/UpdateRequest');
Route.delete('attributes/:attributeId', 'Attributes/AttributeController.delete').validator('Attributes/DeleteRequest');

Route.get('attributes', 'Categories.CategoryController.index');
