FROM node:14.19.0@sha256:224cb9e0a988e1f6cc9b2c30be4dc508ef0ee1199b0f507d27297ff026d742c8

WORKDIR /src/node-function-app

COPY ./ ./

RUN npm i -g azure-functions-core-tools@3 --unsafe-perm true
RUN yarn install

ENV AzureWebJobsScriptRoot=./ \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

EXPOSE 7071

ENTRYPOINT ["yarn", "start"]
