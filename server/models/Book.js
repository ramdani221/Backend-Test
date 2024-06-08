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
    borrowerId: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    },
    borrowDate: Date,
    penalty: {
        memberId: {
            type: Schema.Types.ObjectId,
            ref: 'Member'
        },
        penaltyDate: Date
    }
}, { versionKey: false })

module.exports = model('Book', bookSchema)