import * as child from '@serverless-lerna/child';
import * as config from './config.json';

export async function handler() {
  return { statusCode: 200, body: JSON.stringify({data: child.data, configData: config.key})};
}

console.log(handler());
