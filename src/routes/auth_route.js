const express = require('express')
const collectionAuth = require('../collections/collection_auth')
const auth = require('../middleware/auth_token')
const router = express.Router()

//Method get
router.get('/', auth, collectionAuth.get)

//Method post
router.post('/', collectionAuth.post)

module.exports = router;