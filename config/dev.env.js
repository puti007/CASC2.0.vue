'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"//47.98.126.34:80"',
  WS_API:'"ws://47.98.126.34:8234"'
})
