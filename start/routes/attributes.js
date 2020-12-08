'use strict';

const Route = use('Route');

Route.post('attribute', 'Attributes/AttributeController.store').validator('Attributes/CreateRequest');
Route.put('attribute/:attributeId', 'Attributes/AttributeController.update').validator('Attributes/UpdateRequest');
Route.delete('attribute/:attributeId', 'Attributes/AttributeController.delete').validator('Attributes/DeleteRequest');

Route.get('attributes', 'Attributes/AttributeController.index');
Route.get('attribute/:attributeId', 'Attributes/AttributeController.current');

Route.post('attribute-groups', 'Attributes/AttributeGroupController.store').validator('Attributes/CreateGroupRequest');
Route.put('attribute-groups/:groupId', 'Attributes/AttributeGroupController.update').validator('Attributes/UpdateGroupRequest');
Route.delete('attribute-groups/:groupId', 'Attributes/AttributeGroupController.delete').validator('Attributes/DeleteGroupRequest');

Route.get('attribute-groups', 'Attributes/AttributeGroupController.index');
