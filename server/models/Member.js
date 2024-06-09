const { Schema, model } = require('mongoose')

const memberSchema = new Schema({
    code: {
        type: String,
        unique: true,
        require: true
    },
    name: {
        type: String,
        require: true
    }
}, { versionKey: false })

module.exports = model('Member', memberSchema)