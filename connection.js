'use strict';

module.exports = function (config) {

  let hub = Object.keys(config.connections).reduce(function (acc,elm) {
    acc[elm] = config.promisify(config.connections[elm]);
    return acc;
  },{});

  return hub;
};
