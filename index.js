'use strict';

function csvToArray(value) {
  return value.split(',').map(function(item) { return item.trim(); });
}

function applyCsvToArrayTransform(data, model) {
  Object.keys(model.attributes).forEach(function(key) {
    const attribute = model.attributes[key];
    if (!attribute.csvAsArray) {
      return;
    }
    if (Array.isArray(data)) {
      data.forEach(function(item, index) {
        data[index].setDataValue(key, csvToArray(item.getDataValue(key)));
      });
    } else {
      data.setDataValue(key, csvToArray(data.getDataValue(key)));
    }
  });
  return data;
}

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    hook.result.data = applyCsvToArrayTransform(hook.result.data, hook.service.Model);
    return Promise.resolve(hook);
  };
};