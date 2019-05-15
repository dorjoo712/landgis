'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://localhost/api/v2"',
  DF_API_KEY: '"f43fdcc65dc05f02a427637643c52d0ac7657e5130240dbc08563f48048c89a4"'
})
