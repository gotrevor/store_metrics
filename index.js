#!/usr/bin/env node

'use strict';

const Q = require('q');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(Q.Promise);

exports.handler = function (event, context, callback, _settings) {
  console.log(JSON.stringify(event, null, 2));
  callback(null);
};
