#!/usr/bin/env node

'use strict';

const index = require('./index');

const devCallback = (err, _note) => {
  if (err) {
    throw err;
  }
  console.error('devCallback called with success.');
};

index.handler(event(), null, devCallback);


function event() {
  return JSON.parse(`
{
  "Records": [
        {
            "kinesis": {
                "kinesisSchemaVersion": "1.0",
                "partitionKey": "trevor",
                "sequenceNumber": "49581010300311898051729701556940800639656052316740517890",
                "data": "eyJtZXRyaWMiOiJsb2FkMSIsInZhbHVlIjoyLjUwNDg4MjgxMjUsInVzZXIiOiJ0cmV2b3IifQ==",
                "approximateArrivalTimestamp": 1516634766.122
            },
            "eventSource": "aws:kinesis",
            "eventVersion": "1.0",
            "eventID": "shardId-000000000000:49581010300311898051729701556940800639656052316740517890",
            "eventName": "aws:kinesis:record",
            "invokeIdentityArn": "arn:aws:iam::352302322568:role/lambda_dynamo",
            "awsRegion": "us-east-1",
            "eventSourceARN": "arn:aws:kinesis:us-east-1:352302322568:stream/talk-metrics"
        },
        {
            "kinesis": {
                "kinesisSchemaVersion": "1.0",
                "partitionKey": "trevor",
                "sequenceNumber": "49581010300311898051729701556942009565475666945915224066",
                "data": "eyJtZXRyaWMiOiJsb2FkNSIsInZhbHVlIjoyLjM2NzY3NTc4MTI1LCJ1c2VyIjoidHJldm9yIn0=",
                "approximateArrivalTimestamp": 1516634766.125
            },
            "eventSource": "aws:kinesis",
            "eventVersion": "1.0",
            "eventID": "shardId-000000000000:49581010300311898051729701556942009565475666945915224066",
            "eventName": "aws:kinesis:record",
            "invokeIdentityArn": "arn:aws:iam::352302322568:role/lambda_dynamo",
            "awsRegion": "us-east-1",
            "eventSourceARN": "arn:aws:kinesis:us-east-1:352302322568:stream/talk-metrics"
        }
    ]
}`);
}
