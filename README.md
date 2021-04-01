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

# TODO: Insert the deploy-time-config.json to the package
# Also uncomment the externals line in webpack.config.js
# At the moment this fails because the Serverless package hash cannot be validated
# after config.json is added.
# unzip .serverless/serverless-lerna-webpack.zip -d .serverless/serverless-lerna-webpack
# cp deploy-time-config.json .serverless/serverless-lerna-webpack/dist/config.json
# cd .serverless/serverless-lerna-webpack
# zip -r ../serverless-lerna-webpack.zip .
# cd ../..
# rm -r .serverless/serverless-lerna-webpack

# Deploy the function
yarn run sls:deploy:webpack

# Invoke the function
yarn run sls:invoke:webpack
# ...which will print 42, placeholder-value

# Remove the function
yarn run sls:remove:webpack
```


## Deploy with serverless-webpack to Firebase 

install firebase globally

```
npm i -g firebase
```

Update projectID and token in `serverless.webpack.gcp.yml`

```sh
# Build the packages
yarn run build

cd packages/parent

# Deploy the function
yarn run sls:deploy:firebase:webpack

# Invoke the function
curl https://<region>-<projectID>.cloudfunctions.net/<functionName>
# ...which will print 42, placeholder-value

# Remove the function
firebase --project <projectID> functions:delete <functionName>
```
