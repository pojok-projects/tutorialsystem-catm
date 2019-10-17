const axios = require('axios')
const dotenv = require('dotenv')

const Joi = require('@hapi/joi')

dotenv.config()
const apidbil = process.env.ENDPOINTAPI_DBIL



module.exports = {
    checkDuplicate: async (req, res, next) => {
        try {
            // send post
            const PostData = await axios({
                method: 'POST',
                url: apidbil + 'content/category/search',
                headers: {
                    accept: "application/json"
                },
                data: {
                    name: req.body.name
                }
            })

            if (PostData.data.status.total === 0) {
                next()
            } else {
                res.status(409).json({
                    status: {
                        code: '409',
                        message: 'Duplicate category',
                        total: PostData.data.status.total,
                        succeeded: false
                    },
                    result: PostData.data.result
                })
            }
        } catch (err) {
            next(err)
        }
    },

    checkValidation: async (req, res, next) => {
        try {
            const schema = Joi.object({
                name: Joi.string().pattern(/^[a-zA-Z0-9-_ ]+$/).max(255).required(),
                description: Joi.string().pattern(/^[a-zA-Z0-9-_ ]+$/).max(255).required()
            })

            await schema.validateAsync(req.body);
            next()
        }
        catch (err) {
            res.status(422).json({
                status: {
                    code: '422',
                    message: err.message,
                    succeeded: false
                }
            })
        }
    }

}