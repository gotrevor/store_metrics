#!/usr/bin/env node

'use strict';

const Q = require('q');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(Q.Promise);

console.log('just a stub');
