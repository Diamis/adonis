'use strict'

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
  data = { name: 'категория Cyrillic' };
  response = await client.post('/api/categories').type('json').accept('json').send(data).end();
  response.assertStatus(200);
  response.assertJSON({
    ...response.body,
    ...data,
    slug: 'kategoriya-cyrillic',
    left: 1,
    right: 2,
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
});

test('update validation check', async ({ client }) => {});

test('delete validation check', async ({ client }) => {});
