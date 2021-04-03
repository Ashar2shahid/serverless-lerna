# Serverless example with Lerna monorepo

## Run locally

```sh
# Install dependencies
yarn run bootstrap

# Build the packages
yarn run build

# Run the parent package...
yarn run start
# ...which will print 42, placeholder-value
```

## Plain deployment

Configure Serverless with AWS credentials before moving further

```sh
# Build the packages (we need to do this instead of using serverless-plugin-typescript)
yarn run build

cd packages/parent
# Deploy the function
yarn run sls:deploy:plain

# Invoke the function
yarn run sls:invoke:plain
# ...which will print 42, placeholder-value

# Remove the function
yarn run sls:remove:plain
```

## Deploy with serverless-webpack

```sh
# Build the packages
yarn run build

cd packages/parent
# Package the function
yarn run sls:package:webpack

# Insert the deploy-time-config.json to the package
unzip .serverless/serverless-lerna-webpack.zip -d .serverless/serverless-lerna-webpack
cp deploy-time-config.json .serverless/serverless-lerna-webpack/dist/config.json
cd .serverless/serverless-lerna-webpack
zip -r ../serverless-lerna-webpack.zip .
cd ../..
rm -r .serverless/serverless-lerna-webpack
# Update the package hash
# https://github.com/serverless/serverless/issues/3696#issuecomment-420329192
sha=$(openssl dgst -sha256 -binary .serverless/serverless-lerna-webpack.zip | openssl enc -base64)
echo CodeSHA256 is ${sha}
sed -i "s/\"CodeSha256\": \".*\"/\"CodeSha256\": \"${sha}\"/g" .serverless/*.json

# Deploy the function
yarn run sls:deploy:webpack

# Invoke the function
yarn run sls:invoke:webpack
# ...which will print 42, deploy-time-value

# Remove the function
yarn run sls:remove:webpack
```


## Deploy to GCP Cloud Functions 

Create keyfile.json using the [following](https://www.serverless.com/framework/docs/providers/google/guide/credentials/) (Note: you also need to add IAM Security Admin in roles otherwise the deployed function will not be public) .  


```sh
# Build the packages
yarn run build

cd packages/parent

# Package the function to .webpack
npx webpack --config webpack-gcp.config.js

# Change the deploy time config.json
cp deploy-time-config.json .webpack/config.json

# Copy over the serverless deployment yml
cp serverless.gcp.yml .webpack/
cd .webpack/

# Deploy the function
serverless deploy --config serverless.gcp.yml


# invoke the function
curl <deployed-function-URL>
# ...which will print 42, deploy-time-value

# Remove the function
serverless remove --config serverless.gcp.yml
```
