#!/usr/bin/env node

'use strict';

const Q = require('q');
const AWS = require('aws-sdk');
const _ = require('lodash');

AWS.config.setPromisesDependency(Q.Promise);

exports.handler = function (event, context, callback, _settings) {
  const records = event.Records;
  const data = _.map(records, (record) => {
    return JSON.parse(new Buffer(record.kinesis.data, 'base64'));
  });

  processData(data);

  callback(null);
};

function processData(data) {
  _.each(data, (datum) => {
    console.log(JSON.stringify(datum));
  });
}
