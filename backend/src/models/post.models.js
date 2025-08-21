const {Schema, model} = require('mongoose')

const postSchema = new Schema({
    url: String,
    caption: String
})

const postModel = model('post', postSchema)
module.exports = postModel;