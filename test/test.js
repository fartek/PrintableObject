import test from 'ava';
import po from '../src/index';

test('String should be surrounded in single quotes and followed by a newline', t => {
  t.is(po('Hello world', 2, 0, '\''), '\'Hello world\'\n');
});

test('Array should have every element on a newline and followed by a comma', t => {
  t.is(po([1, 2, 'hello', 4], 2, 0, '\''), `[\n  1,\n  2,\n  'hello',\n  4,\n]\n`);
});

test('String should be padded by 6 spaces', t => {
  t.is(po('Hello world', 2, 6, '\''), '      \'Hello world\'\n');
});

test('Array should be padded by 4 spaces', t => {
  t.is(po([2, [2, [6]]], 4, 0, '\''), `[\n    2,\n    [\n        2,\n        [\n            6,\n        ],\n    ],\n]\n`);
});

test('Custom max depth', t => {
  const obj = { a: { b: { c: 'test' } }};
  const res = `{\n  a: {\n    'Reached max depth. To view further, change the maxDepth parameter.'\n  },\n}\n`;
  t.is(po(obj, 2, 0, '\'', 1), res)
});