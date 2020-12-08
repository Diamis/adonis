'use strict';

const { test, trait } = use('Test/Suite')('AttributeGroupController');

trait('Test/ApiClient');

test('add validation check', async ({ client }) => {
  let response;
  let data = { name: 'group agro', sort: 10 };
  response = await client.post('/api/attribute-groups').type('json').accept('json').send(data).end();
  response.assertStatus(201);

  data = { name: 'group auto', sort: 5 };
  response = await client.post('/api/attribute-groups').type('json').accept('json').send(data).end();
  response.assertStatus(201);
});

test('update validation check', async ({ client }) => {
  let response;
  let data = {};
  // response = await client.put('/api/attribute-groups/1').type('json').accept('json').send(data).end();
  // response.assertStatus(200);
});

test('delete validation check', async ({ client }) => {
  let response;
  // response = await client.delete('/api/attribute-groups/1').end();
  // response.assertStatus(204);
});

test('get attributes group', async ({ client }) => {
  let response;
});
