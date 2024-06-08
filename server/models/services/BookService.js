const Book = require("../Book");

class BookService {

    static async creat(input) {
        try {
            return await Book.create(input)
        } catch (error) {
            console.log(error)
            throw error.message
        }
    }
    
        static async find(id, stock = 1) {
            try {
                const params = { stock }
                if (id) params._id = id
                return (await Book.find(params))
            } catch (error) {
                throw error.message
            }
        }

    static async update(id, input) {
        try {
            return await Book.findByIdAndUpdate(id, input, { new: true })
        } catch (error) {
            throw error.message
        }
    }

    static async remove(id) {
        return await Book.findByIdAndDelete(id, { new: true })
    }

    static async borrow(id, borrowerId) {
        try {
            if ((await this.find(null, 0)).filter(item => item.borrowerId == borrowerId).length > 1) throw Error('You have borrowed 2 books')
            const data = await this.find(id)
            if (data[0].penalty.memberId == borrowerId && new Date (data[0].penalty.penaltyDate) > new Date())
                throw Error('You are still within the penalty period for borrowing this book')
            if (new Date(data[0].penalty.penaltyDate) < new Date()) data[0].penalty = { memberId: null, penaltyDate: null }, data[0].save()
            return await Book.findByIdAndUpdate(id, { borrowerId, borrowDate: new Date(), stock: 0 }, { new: true })
        } catch (error) {
            throw error.message
        }
    }

    static async return(id, borrowerId) {
        try {
            const data = await this.find(id, 0)
            if(data[0].borrowerId != borrowerId) throw Error('The returner is not the person who borrowed')
            const returnDate = new Date(data[0].borrowDate)
            returnDate.setDate(returnDate.getDate() + 7)
            if (returnDate < new Date()) {
                const penaltyDate = new Date()
                penaltyDate.setDate(penaltyDate.getDate() + 3)
                return await Book.findByIdAndUpdate(id, { borrowerId: null, borrowDate: null, stock: 1, penalty: { memberId: borrowerId, penaltyDate } }, { new: true })
            }
            return await Book.findByIdAndUpdate(id, { borrowerId: null, borrowDate: null, stock: 1 }, { new: true })
        } catch (error) {
            throw error.message
        }
    }
}

module.exports = BookService