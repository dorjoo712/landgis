'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: '"http://localhost/api/v2"',
  DF_API_KEY: '"f43fdcc65dc05f02a427637643c52d0ac7657e5130240dbc08563f48048c89a4"'
})
