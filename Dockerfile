FROM node:14.19.0 AS builder
WORKDIR /tmp/app
COPY . .
RUN yarn global add npm-run-all --non-interactive
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:14.19.0 AS production
WORKDIR /tmp/src/node-function-app

RUN yarn global add npm-run-all --non-interactive
RUN npm i -g azure-functions-core-tools@3 --unsafe-perm true

COPY --from=builder /tmp/app/dist ./dist
COPY --from=builder /tmp/app/host.json ./

COPY --from=builder /tmp/app/Donation/function.json ./Donation/
COPY --from=builder /tmp/app/Info/function.json ./Info/


COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

RUN yarn global add npm-run-all --non-interactive
RUN /usr/local/bin/func extensions install

ENV AzureWebJobsScriptRoot=./ \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true \
    DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1

EXPOSE 7071
ENTRYPOINT ["yarn", "start"]
