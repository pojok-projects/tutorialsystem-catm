const v1 = require('express').Router()
const category = require('./category')

v1.use('/category', category)

module.exports = v1;