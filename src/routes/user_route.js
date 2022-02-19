const auth = require('../middleware/auth_token')
const express = require('express')
const router = express.Router()
const collection_users = require('../collections/collection_users')

//Methods post
router.post('/', collection_users.post)

//Methods put
router.put('/:idUser', auth, collection_users.put)

module.exports = router;