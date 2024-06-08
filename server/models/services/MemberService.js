const Member = require("../Member");

class MemberService {
    static async creat(input) {
        try {
            return await Member.create(input)
        } catch (error) {
            throw error.message
        }
    }

    static async find() {
        try {
            return await Member.find()
        } catch (error) {
            throw error.message
        }
    }

    static async update(id, input) {
        try {
            return await Member.findByIdAndUpdate(id, input, { new: true })
        } catch (error) {
            throw error.message
        }
    }

    static async remove(id) {
        try {
            return  await Member.findByIdAndDelete(id, { new: true })
        } catch (error) {
            throw error.message
        }
    }
}

module.exports = MemberService