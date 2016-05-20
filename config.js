'use strict';

const redis = require('redis');
const Promise = require('bluebird');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const promisify = options => redis.createClient(options);

const connections = {
  'zero': {
    host:'127.0.0.1',
    port:'6379',
    parser:'hiredis',
    db:0
  },
  'one': {
    host:'127.0.0.1',
    port:'6379',
    parser:'hiredis',
    db:1
  },
  'two': {
    host:'127.0.0.1',
    port:'6379',
    parser:'hiredis',
    db:2
  },
  'three': {
    host:'127.0.0.1',
    port:'6379',
    parser:'hiredis',
    db:3
  }
};

module.exports = {
  promisify:promisify,
  connections:connections
};
