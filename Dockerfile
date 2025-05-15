FROM node:14.19.0

WORKDIR /tmp

COPY ./ ./

RUN npm i -g azure-functions-core-tools@3 --unsafe-perm true
RUN yarn install

COPY ./ /src/node-function-app

ENV AzureWebJobsScriptRoot=./ \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

EXPOSE 7071

ENTRYPOINT ["yarn", "start"]
