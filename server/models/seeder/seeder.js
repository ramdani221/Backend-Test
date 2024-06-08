const mongoose = require('mongoose');
const MemberService = require('../services/MemberService');
const BookService = require('../services/BookService');

async function seedData() {
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb');

    await MemberService.creat([
        {
            code: "M001",
            name: "Agus"
        },
        {
            code: "M002",
            name: "Ferry"
        },
        {
            code: "M003",
            name: "Putri"
        },
        {
            code: "M004",
            name: "Mamat"
        }
    ])

    await BookService.creat([
        {
            code: "JK-45",
            title: "Harry Potter",
            author: "J.K Rowling",
        },
        {
            code: "SHR-1",
            title: "A Study in Scarlet",
            author: "Arthur Conan Doyle",
        },
        {
            code: "TW-11",
            title: "Twilight",
            author: "Stephenie Meyer",
        },
        {
            code: "HOB-83",
            title: "The Hobbit, or There and Back Again",
            author: "J.R.R. Tolkien",
        },
        {
            code: "NRN-7",
            title: "The Lion, the Witch and the Wardrobe",
            author: "C.S. Lewis",
        },
    ])

    await mongoose.disconnect()
}

seedData().then(() => {
    console.log('Seeding data completed')
    process.exit(0)
}).catch(err => {
    console.log('Error seeding data', err)
    process.exit(1)
});