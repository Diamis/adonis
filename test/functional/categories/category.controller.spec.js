'use strict';

const { test, trait } = use('Test/Suite')('CategoryMutateController');

trait('Test/ApiClient');

test('add validation check', async ({ client }) => {
  let data = {};
  let response;

  // check name
  response = await client.post('/api/categories').type('json').accept('json').send(data).end();
  response.assertStatus(400);
  response.assertJSON({ errors: [{
      title: 'required',
      detail: 'You must provide a field "name"',
      source: { pointer: 'name' }
  }] });

  // add category
  data = { name: 'Категория Cyrillic' };
  response = await client.post('/api/categories').type('json').accept('json').send(data).end();
  response.assertStatus(200);
  response.assertJSON({
    ...response.body,
    ...data,
    slug: 'kategoriya-cyrillic',
    left: 2,
    right: 3,
    level: 0
  });
  
  // add categories with children
  data = {
    name: 'root children',
    children: [
      { name: 'children one' },
      { name: 'children two'},
      { name: 'children tree',
        children: [
          { name: 'tree children one' },
          { name: 'tree children two' },
          { name: 'tree children tree' }
        ]
      }
    ]
  };
  response = await client.post('/api/categories').type('json').accept('json').send(data).end();
  response.assertStatus(200);
  response.assertJSON({
    ...response.body,
    name: 'root children',
    slug: 'root-children',
    left: 4,
    right: 17,
    level: 0
  });
});

test('delete validation check', async ({ client }) => {
  let response;
  const data = {
    name: 'remove category',
    children: [
      { name: 'remove children one' },
      { name: 'remove children two'},
      { name: 'remove children tree' }
    ]
  };

  // Удаляем категорию вместе с ее потомками
  const { body: { id } } = await client.post('/api/categories').type('json').accept('json').send(data).end();
  response = await client.delete(`/api/categories/${id}`).end();
  response.assertStatus(204);

  // Пробуем удалить несуществующую категорию
  response = await client.delete('/api/categories/125').end();
  response.assertStatus(500);
});

test('update validation check', async ({ client }) => {
  const data = { parent_id: 1 };
  const response = await client.put(`/api/categories/5`).type('json').accept('json').send(data).end();
  response.assertStatus(200);
});