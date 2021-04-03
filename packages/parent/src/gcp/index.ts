import * as child from '@serverless-lerna/child';
import * as config from './config.json';
'use strict';


exports.handler = (request, response) => {
  response.status(200).send({ statusCode: 200, body: JSON.stringify({data: child.data, configData: config.key})});
};

exports.event = (event, callback) => {
  callback();
};