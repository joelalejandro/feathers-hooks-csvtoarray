# feathers-hooks-csvtoarray
Feathers hook for converting a comma-delimited list to an Array of strings.

## Installing

Simply run `npm install --save feathers-hooks-csvtoarray` and you're good to go!

## Usage

> **Important:** As of version 0.1.0, this hook is intended to use with Sequelize. Further versions will move the coupling code to hook configurations.

Require the hook:

```js
const csvToArray = require('feathers-hooks-csvtoarray');
```

Then, choose which fields in your Sequelize Model should be parsed by the hook, adding the option `csvAsArray: true`:

```js
// things.model.js
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const things = sequelizeClient.define('things', {
    id: {
      type: Sequelize.CHAR(100),
      allowNull: false,
      primaryKey: true
    },
    names: {
      type: Sequelize.CHAR(200),
      allowNull: false,
      csvAsArray: true // this will be parsed by csvtoarray
    }, {}
  });

  return things;
};
```    

Finally, bind the hook to the model's service.

```js
app.service('things').hooks({
  after: {
    find: [ csvToArray() ],
    get: [ csvToArray() ]
  }
});
```

## TODOs

Check out the [issues](https://github.com/joelalejandro/feathers-hooks-csvtoarray/issues).

## Feel like contributing?

Knock yourself out! Fork the repo and make a PR.

## Licence

MIT

