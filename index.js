'use strict';

const Promise = require('bluebird');
const hub = require('./connection.js')(require('./config.js'));

hub.one.flushallAsync()
.then(res => {
  return Promise.all([
    hub.one.setAsync('count',10),
    hub.two.setAsync('count',10)
  ]);
})
.then(res => {
  return Promise.all([
    hub.one.incrAsync('count'),
    hub.two.decrAsync('count')
  ]);
})
.then(res => {
  return Promise.props({
    one:hub.one.getAsync('count'),
    two:hub.two.getAsync('count')
  });
})
.then(res => {
  console.log('before',res);
  return hub.one.flushdbAsync();
})
.then(res => {
  return Promise.props({
    one:hub.one.getAsync('count'),
    two:hub.two.getAsync('count')
  });
})
.then(res => {
  console.log('middle',res);
  return hub.two.moveAsync('count',1);
})
.then(res => {
  return Promise.props({
    one:hub.one.getAsync('count'),
    two:hub.two.getAsync('count')
  });
})
.then(res => {
  console.log('after',res);
})
.catch(error => {
  console.log('error',error);
});
