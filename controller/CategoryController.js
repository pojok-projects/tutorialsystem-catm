const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const apidbil = process.env.ENDPOINTAPI_DBIL

module.exports = {
    index: async (req, res, next) => {
        try {
            const axiosReq = await axios.get(apidbil + 'content/category')

            if (axiosReq.status === 200) {
                res.send(axiosReq.data)
            } else {
                throw new Error(axiosReq)
            }
        } catch (err) {
            next(err)
        }
    },

    create: async (req, res, next) => {
        try {                       
            // get form input
            const {
                name,
                description
            } = req.body

            const newData = {
                name: name,
                description: description
            }

            // send post
            const PostData = await axios({
                method: 'POST',
                url: apidbil + 'content/category/store',
                headers: {
                    accept: "application/json"
                },
                data: newData
            })

            res.json(PostData.data)
        } catch (err) {
            next(err)
        }
    },

    search: async (req, res, next) => {
        try {
            // send post
            const PostData = await axios({
                method: 'POST',
                url: apidbil + 'content/category/search',
                headers: {
                    accept: "application/json"
                },
                data: {
                    name: req.query.name
                }
            })

            if (PostData.status === 200) {
                res.send(PostData.data)
            } else {
                throw new Error(PostData)
            }
        } catch (err) {
            next(err)
        }
    },

    show: async (req, res, next) => {
        try {
            const axiosReq = await axios.get(apidbil + 'content/category/' + req.params.categoryid)

            if (axiosReq.status === 200) {
                res.send(axiosReq.data)
            } else {
                throw new Error(axiosReq)
            }
        } catch (err) {
            next(err)
        }
    },

    update: async (req, res, next) => {
        try {     
            // get form input
            const {
                name,
                description
            } = req.body

            const newData = {
                name: name,
                description: description
            }

            // send post
            const PostData = await axios({
                method: 'POST',
                url: apidbil + 'content/category/update/' + req.params.categoryid,
                headers: {
                    accept: "application/json"
                },
                data: newData
            })

            res.json(PostData.data)
        } catch (err) {
            next(err)
        }
    },

    destroy: async (req, res, next) => {
        try {
            // send post
            const PostData = await axios({
                method: 'POST',
                url: apidbil + 'content/category/delete/' + req.params.categoryid,
                headers: {
                    accept: "application/json"
                }
            })

            res.json(PostData.data)
        } catch (err) {
            next(err)
        }
    },
}