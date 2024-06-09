const chai = require('chai');
const chaiHTTP = require('chai-http');

const app = require('../app');

chai.should();
chai.use(chaiHTTP);

describe('Members', function () {

    it('Should success load members on /members GET', function (done) {
        chai.request(app)
            .get('/members')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.be.a('array');
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('code');
                res.body[0].code.should.be.a('string')
                res.body[0].code.should.equal('M002');
                res.body[0].should.have.property('name');
                res.body[0].name.should.be.a('string')
                res.body[0].name.should.equal('Ferry');
                done()
            });
    });

})

describe('Books', function () {
    it('Should success load books on /books GET', function (done) {
        chai.request(app)
            .get('/books')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.be.a('array');
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('code');
                res.body[0].code.should.be.a('string')
                res.body[0].code.should.equal('HOB-83');
                res.body[0].should.have.property('title');
                res.body[0].title.should.be.a('string')
                res.body[0].title.should.equal('The Hobbit, or There and Back Again');
                res.body[0].should.have.property('author');
                res.body[0].author.should.be.a('string')
                res.body[0].author.should.equal('J.R.R. Tolkien');
                res.body[0].should.have.property('stock');
                res.body[0].stock.should.be.a('number')
                res.body[0].stock.should.equal(1);
                done()
            });
    });

    it('Should success borrow books on /books/borrow/:code put', function (done) {
        chai.request(app)
            .put('/books/borrow/JK-45')
            .send({ borrowerCode: 'M004' })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.be.a('object');
                res.body.should.have.property('code');
                res.body.code.should.be.a('string');
                res.body.code.should.equal('JK-45');
                res.body.should.have.property('title');
                res.body.title.should.be.a('string');
                res.body.title.should.equal('Harry Potter');
                res.body.should.have.property('author');
                res.body.author.should.be.a('string');
                res.body.author.should.equal('J.K Rowling');
                res.body.should.have.property('stock');
                res.body.stock.should.be.a('number');
                res.body.stock.should.equal(0);
                done()
            });
    });

    it('Should failed borrow books on /books/borrow/:code put', function (done) {
        chai.request(app)
            .put('/books/borrow/SHR-1')
            .send({borrowerCode: 'M001'})
            .end(function (err, res) {
                res.should.have.status(500);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.a('string');
                res.body.error.should.equal('You have borrowed 2 books');
                done()
            });
    });

    it('Should failed borrow books on /books/borrow/:code put', function (done) {
        chai.request(app)
            .put('/books/borrow/NRN-7')
            .send({borrowerCode: 'M003'})
            .end(function (err, res) {
                res.should.have.status(500);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.a('string');
                res.body.error.should.equal('The book has been borrowed');
                done()
            });
    });

    it('Should failed borrow books on /books/borrow/:code put', function (done) {
        chai.request(app)
            .put('/books/borrow/F-45')
            .send({borrowerCode: 'M002'})
            .end(function (err, res) {
                res.should.have.status(500);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.a('string');
                res.body.error.should.equal('You are still within the penalty period for borrowing this book');
                done()
            });
    });

    it('Should success return books on /books/return/:code put', function (done) {
        chai.request(app)
            .put('/books/return/SHR-1')
            .send({ borrowerCode: 'M003' })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.be.a('object');
                res.body.should.have.property('code');
                res.body.code.should.be.a('string');
                res.body.code.should.equal('SHR-1');
                res.body.should.have.property('title');
                res.body.title.should.be.a('string');
                res.body.title.should.equal('A Study in Scarlet');
                res.body.should.have.property('author');
                res.body.author.should.be.a('string');
                res.body.author.should.equal('Arthur Conan Doyle');
                res.body.should.have.property('stock');
                res.body.stock.should.be.a('number');
                res.body.stock.should.equal(1);
                done()
            });
    });
})