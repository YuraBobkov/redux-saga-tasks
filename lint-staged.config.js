'use strict';

module.exports = {
  '**/*.js': ['eslint --fix'],
  '**/*.{json,md,yml}': ['prettier --write'],
};
