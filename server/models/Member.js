const { Schema, model } = require('mongoose')

const memberSchema = new Schema({
    code: {
        type: String,
        unique: true
    },
    name: String
}, { versionKey: false })

module.exports = model('Member', memberSchema)