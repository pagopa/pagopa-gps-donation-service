FROM golang:1.18

COPY ./ ./

RUN go install go.k6.io/xk6/cmd/xk6@latest
RUN xk6 build --with github.com/szkiba/xk6-dashboard@latest

ENTRYPOINT ./k6 run --env VARS=docker.environment.json --env TEST_TYPE=./test-types/load.json --out dashboard main.js

