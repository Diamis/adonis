"use strict";

const { test } = use("Test/Suite")("[TEST] Utils.Console.log");
const Console = require("./utils");

test('String | Number', async  ({ assert }) => {
  const rawNumber = 1234567;
  const rawString = 'hello string!';

  const string = Console.log(rawString);
  const number = Console.log(rawNumber);

  assert.equal(string, rawString);
  assert.equal(number, rawNumber);
});

test('Object<{ [key:string]: String | Number }>', async ({ assert }) => {
  const rawObject = {
    string: 'string1',
    number: 111111,
  };

  const object = Console.log(rawObject);
  const resObject = "{\n" +
    " string: string1\n" +
    " number: 111111\n" +
    "}"

  assert.equal(object, resObject)
});

test('Object<{ [key:string]: String | Number | Object }>', async ({ assert }) => {
  const rawObject = {
    string: 'string2',
    number: 222222,
    object: {}
  };

  const object = Console.log(rawObject);
  const resObject = "{\n" +
    " string: string2\n" +
    " number: 222222\n" +
    " object: {\n" +
    " }\n" +
    "}"

  assert.equal(object, resObject)
});

test('Array< String | Number >', async ({ assert }) => {
  const rawArray = ['string1', 'string2', 1234, 'string3', 678];
  const array = Console.log(rawArray);
  const resArrayStringNumber = "[\n" +
    " string1\n" +
    " string2\n" +
    " 1234\n" +
    " string3\n" +
    " 678\n" +
    "]";

  assert.equal(array, resArrayStringNumber)
});

test('Array< String | Number | Object >', async ({ assert }) => {
  const rawArray = ['string1', 11111, { string: 'string2', number: 22222 }];
  const array = Console.log(rawArray);
  const resArrayStringNumberObject = "[\n" +
    " string1\n" +
    " 11111\n" +
    " {\n" +
    "   string: string2\n" +
    "   number: 22222\n" +
    " }\n" +
    "]";

  assert.equal(array, resArrayStringNumberObject)
});

test('Array<{ [key:string]: Children }>', async ({ assert }) => {
  const rawArray = [
    { id: 1, name: 'name1', children: [] },
    { id: 2, name: 'name2', children: [{ id: 4, name: 'name4' }] },
    { id: 3, name: 'name3', children: [] }
  ];

  const array = Console.log(rawArray);
  const resArrayChildren = "[\n" +
  " {\n" +
  "   id: 1\n" +
  "   name: name1\n" +
  "   children: [\n" +
  "   ]\n" +
  " }\n" +
  " {\n" +
  "   id: 2\n" +
  "   name: name2\n" +
  "   children: [\n" +
  "     {\n" +
  "       id: 4\n" +
  "       name: name4\n" +
  "     }\n" +
  "   ]\n" +
  " }\n" +
  " {\n" +
  "   id: 3\n" +
  "   name: name3\n" +
  "   children: [\n" +
  "   ]\n" +
  " }\n" +
  "]";

  assert.equal(array, resArrayChildren)
});

