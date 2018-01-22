#!/usr/bin/env node

'use strict';

const Q = require('q');
const AWS = require('aws-sdk');
const _ = require('lodash');

AWS.config.setPromisesDependency(Q.Promise);

const dynamodb = new AWS.DynamoDB({ region: 'us-east-1' });

exports.handler = function (event, context, callback, _settings) {
  const records = event.Records;
  const data = _.map(records, (record) => {
    return JSON.parse(new Buffer(record.kinesis.data, 'base64'));
  });

  return processData(data)
    .then(result => callback(null, result))
    .catch(e => callback(e));
};

function processData(data) {
  _.each(data, (datum) => {
    console.log(JSON.stringify(datum));
  });

  const dynamoData = _(data)
    .map((datum) => {
      const user = datum.user;
      const metric = datum.metric;
      return {
        PutRequest: {
          Item: {
            'user-metric': { S: `${user}-${metric}` },
            user: { S: user },
            metric: { S: metric },
            value: { N: `${datum.value}` },
            timestamp: { S: `${datum.timestamp}` },
          },
        },
      };
    })
  .chunk(25).value();

  return Q.all(_.map(dynamoData, (chunk) => {
    const params = {
      RequestItems: {
        'trevor-talk-metrics': chunk,
      },
    };
    return dynamodb.batchWriteItem(params).promise();
  }));
}
