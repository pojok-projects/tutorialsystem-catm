const catmRouter = require('express').Router()
const v1 = require('./v1')

catmRouter.use('/v1', v1)

module.exports = catmRouter;