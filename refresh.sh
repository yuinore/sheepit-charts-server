#!/bin/bash

cd `dirname $0`

eval "$(cat .env <(echo) <(declare -x))"

${NODE_PATH} tools/generate_colors.mjs
${NODE_PATH} tools/parse.mjs
${NODE_PATH} tools/parse_points.mjs
${NODE_PATH} tools/aggregate.mjs
${NODE_PATH} tools/aggregate_points.mjs
