const Member = require("../Member");

class MemberService {
    static async creat(input) {
        try {
            const {code, name} = await Member.create(input)
            return {code, name}
        } catch (error) {
            throw error.message
        }
    }

    static async find() {
        try {
            return (await Member.find()).map(item => ({code: item.code, name: item.name}))
        } catch (error) {
            throw error.message
        }
    }

    static async update(code, name) {
        try {
            const {code, name} = await Member.findOneAndUpdate({code}, name, {new: true})
            return {code, name}
        } catch (error) {
            throw error.message
        }
    }

    static async remove(code) {
        try {
            const data = await Member.findOneAndDelete ({code}, { new: true })
            if (!data) throw Error("That member doesen't exist")
            return {code: data.code, name: data.name}
        } catch (error) {
            throw error.message
        }
    }
}

module.exports = MemberService