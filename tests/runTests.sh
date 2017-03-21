#!/usr/bin/env bash
set -eu

function afterAll {
  set +e

  kill $(lsof -i tcp:8080 | awk '{if ($1 == "node") print $2;}')
  kill $(lsof -i tcp:4445 | awk '{if ($1 == "sc") print $2;}')
  kill $(lsof -i tcp:4444 | awk '{if ($1 == "java") print $2;}')

  set -e
}

trap "afterAll"  EXIT

afterAll

node ./tests/prepare.js

npm run start:prod &

timeout 10m bash -c "while ! lsof -i tcp:8080 -Fn | grep http-alt; do sleep 10; done"

./node_modules/.bin/nightwatch -e chrome ./tests/tests/test.js
