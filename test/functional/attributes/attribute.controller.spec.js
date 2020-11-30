'use strict';

const { test, trait } = use('Test/Suite')('AttributeController');

trait('Test/ApiClient');

test('add validation check', async ({ client }) => {
  let response;
  let data = { 
    name: 'first attribute color', 
    sort: 1,
    is_required: true,
    options: [
      { label: 'синий', value: 'blue' },
      { label: 'красный', value: 'red' },
      { label: 'зеленый', value: 'green' }
    ],
    defaultValue: 'red'
  };
 
  response = await client.post('/api/attributes').type('json').accept('json').send(data).end();
  response.assertStatus(201);

  data = { name: 'two attribute', defaultValue: 'default string' }
  response = await client.post('/api/attributes').type('json').accept('json').send(data).end();
  response.assertStatus(201);
});

test('update validation check', async ({ client }) => {
  let response;
  let data = { name: 'update attribute' };
  response = await client.put('/api/attributes/1').type('json').accept('json').send(data).end();
  response.assertStatus(200);
});

test('delete validation check', async ({ client }) => {
  let response;
  response = await client.delete('/api/attributes/1').end();
  response.assertStatus(204);
});
