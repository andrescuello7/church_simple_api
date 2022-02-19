const mongoose = require('mongoose')

const user = mongoose.Schema({
    user:{
        type: String,
        required: true,
        tim: true
    },
    email:{
        type: String,
        required: true,
        tim: true
    },
    password:{
        type: String,
        required: true,
        tim: true
    },
    photo:{
        type: String
    },
    post: {
        user: {
          type: String,
        },
        photo: {
          type: String,
        },
        description: {
          type: String,
        },
        comment: {
          photo: String,
          user: String,
          description: String,
        }
    },
    CreateAdd:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('user', user)