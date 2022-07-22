FROM node:14.19.0

WORKDIR /src/node-function-app

COPY ./ ./

RUN npm i -g azure-functions-core-tools@3 --unsafe-perm true
RUN yarn install

ENV AzureWebJobsScriptRoot=./ \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

EXPOSE 7071

ENTRYPOINT ["yarn", "start"]
