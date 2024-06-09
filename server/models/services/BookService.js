const Book = require("../Book");

class BookService {

    static async creat(input) {
        try {
            const { code, title, author, stock } = await Book.create(input)
            return { code, title, author, stock }
        } catch (error) {
            throw error.message
        }
    }

    static async find() {
        try {
            return (await Book.find({stock: 1})).map(item => ({ code: item.code, title: item.title, author: item.author, stock: item.stock }))
        } catch (error) {
            throw error.message
        }
    }

    static async update(code, input) {
        try {
            const data = await Book.findOneAndUpdate({ code }, input, { new: true })
            return { code: data.code, title: data.title, author: data.author, stock: data.stock }
        } catch (error) {
            throw error.message
        }
    }

    static async remove(code) {
        try {
            const data = await Book.findOneAndDelete({ code }, { new: true })
            if (!data) throw Error("That member doesen't exist")
            return { code: data.code, title: data.title, author: data.author, stock: data.stock }
        } catch (error) {
            throw error.message
        }

    }

    static async borrow(code, borrowerCode) {
        try {
            const data = await Book.findOne({ code })
            if (new Date(data.penalty.penaltyDate) < new Date()) data.penalty = { memberCode: null, penaltyDate: null }, data.save()

            if ((await Book.find({borrowerCode})).filter(item => item.borrowerCode == borrowerCode).length > 1) throw Error('You have borrowed 2 books')
            if (data.stock == 0) throw Error('The book has been borrowed')
            if (data.penalty.memberCode == borrowerCode && new Date(data.penalty.penaltyDate) > new Date())
                throw Error('You are still within the penalty period for borrowing this book')
                
            const result = await Book.findOneAndUpdate({ code }, { borrowerCode, borrowDate: new Date(), stock: 0 }, { new: true })
            return { code: result.code, title: result.title, author: result.author, stock: result.stock }
        } catch (error) {
            throw error.message
        }
    }

    static async return(code, borrowerCode) {
        try {
            const data = await Book.findOne({ code })
            
            if (new Date(data.penalty.penaltyDate) < new Date()) data.penalty = { memberCode: null, penaltyDate: null }, data.save()
            if (data.borrowerCode != borrowerCode) throw Error('The returner is not the person who borrowed')

            const result = await Book.findOneAndUpdate({code}, { borrowerCode: null, borrowDate: null, stock: 1 }, { new: true })
            const returnDate = new Date(data.borrowDate)
            returnDate.setDate(returnDate.getDate() + 7)

            if (returnDate < new Date()) {
                const penaltyDate = new Date()
                penaltyDate.setDate(penaltyDate.getDate() + 3)
                result.penalty = {memberCode: borrowerCode, penaltyDate}
                result.save()
            }

            return { code: result.code, title: result.title, author: result.author, stock: result.stock }
        } catch (error) {
            throw error.message
        }
    }
}

module.exports = BookService