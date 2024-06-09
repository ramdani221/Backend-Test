const { Schema, model } = require('mongoose')

const bookSchema = new Schema({
    code: {
        type: String,
        unique: true
    },
    title: String,
    author: String,
    stock: {
        type: Number,
        default: 1
    },
    borrowerCode: String,
    borrowDate: Date,
    penalty: {
        memberCode: String,
        penaltyDate: Date
    }
}, { versionKey: false })

module.exports = model('Book', bookSchema)