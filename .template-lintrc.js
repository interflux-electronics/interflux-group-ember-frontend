'use strict';

module.exports = {
  extends: 'recommended',

  rules: {
    'no-implicit-this': { allow: ['cdn', 'env'] },
    'no-empty-headings': 'warn'
  }
};
