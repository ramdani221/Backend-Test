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
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.be.a('object');
                res.body.data[0].should.have.property('_id');
                res.body.data[0]._id.should.be.a('string')
                res.body.data[0]._id.should.equal('666460f00669e1d3e64bf74c');
                res.body.data[0].should.have.property('code');
                res.body.data[0].code.should.be.a('string')
                res.body.data[0].code.should.equal('M002');
                res.body.data[0].should.have.property('name');
                res.body.data[0].name.should.be.a('string')
                res.body.data[0].name.should.equal('Ferry');
                done()
            });
    });

    // it('Should success create members on /members post', function (done) {
    //     chai.request(app)
    //         .post('/members')
    //         .send({ code: 'M005', name: 'Bagas' })
    //         .end(function (err, res) {
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             res.should.be.a('object');
    //             res.body.should.have.property('data');
    //             res.body.data.should.be.a('object');
    //             res.body.data.should.have.property('_id');
    //             res.body.data._id.should.be.a('string')
    //             res.body.data.should.have.property('code');
    //             res.body.data.code.should.be.a('string')
    //             res.body.data.code.should.equal('M005');
    //             res.body.data.should.have.property('name');
    //             res.body.data.name.should.be.a('string')
    //             res.body.data.name.should.equal('Bagas');
    //             done()
    //         });
    // });

    // it('Should failed create members on /members post', function (done) {
    //     chai.request(app)
    //         .post('/members')
    //         .send({ code: 'M005', name: 'Bagas' })
    //         .end(function (err, res) {
    //             res.should.have.status(500);
    //             res.should.be.json;
    //             res.should.be.a('object');
    //             res.body.should.have.property('error');
    //             res.body.error.should.be.a('string');
    //             res.body.error.should.equal('E11000 duplicate key error collection: testdb.members index: code_1 dup key: { code: \"M001\" }');
    //             done()
    //         });
    // });

    // it('Should success update members on /members/:_id put', function (done) {
    //     chai.request(app)
    //         .put('/members/6664864ec165bed73d3a72b8')
    //         .send({ code: 'M010', name: 'Pegas' })
    //         .end(function (err, res) {
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             res.should.be.a('object');
    //             res.body.should.have.property('data');
    //             res.body.data.should.be.a('object');
    //             res.body.data.should.have.property('_id');
    //             res.body.data._id.should.be.a('string');
    //             res.body.data._id.should.equal('6664864ec165bed73d3a72b8')
    //             res.body.data.should.have.property('code');
    //             res.body.data.code.should.be.a('string')
    //             res.body.data.code.should.equal('M010');
    //             res.body.data.should.have.property('name');
    //             res.body.data.name.should.be.a('string')
    //             res.body.data.name.should.equal('Pegas');
    //             done()
    //         });
    // });

    // it('Should failed update members on /members/:_id put', function (done) {
    //     chai.request(app)
    //         .put('/members/6664864ec165bed73d3a72b8')
    //         .send({ code: 'M001', name: 'Lala' })
    //         .end(function (err, res) {
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             res.should.be.a('object');
    //             res.body.should.have.property('error');
    //             res.body.error.should.be.a('string');
    //             res.body.error.should.equal('Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: testdb.members index: code_1 dup key: { code: \"M001\" }');
    //             done()
    //         });
    // });

    // it('Should success delete members on /members/:_id delete', function (done) {
    //     chai.request(app)
    //         .delete('/members/6664852125ac61d14825ef80')
    //         .end(function (err, res) {
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             res.should.be.a('object');
    //             res.body.should.have.property('data');
    //             res.body.data.should.be.a('object');
    //             res.body.data.should.have.property('_id');
    //             res.body.data._id.should.be.a('string');
    //             res.body.data._id.should.equal('6664852125ac61d14825ef80')
    //             res.body.data.should.have.property('code');
    //             res.body.data.code.should.be.a('string')
    //             res.body.data.code.should.equal('M006');
    //             res.body.data.should.have.property('name');
    //             res.body.data.name.should.be.a('string')
    //             res.body.data.name.should.equal('Ujang');
    //             done()
    //         });
    // });

    // it('Should failed delete members on /members/:_id delete', function (done) {
    //     chai.request(app)
    //         .delete('/members/6664852125ac61d14825ef80')
    //         .end(function (err, res) {
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             res.should.be.a('object');
    //             res.body.should.have.property('error');
    //             res.body.error.should.be.a('string');
    //             res.body.error.should.equal('The member is not exist');
    //             done()
    //         });
    // });


})

describe('Books', function () {
    it('Should success load books on /books GET', function (done) {
        chai.request(app)
            .get('/books')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.be.a('object');
                res.body.data[0].should.have.property('_id');
                res.body.data[0]._id.should.be.a('string')
                res.body.data[0]._id.should.equal('666464813a9b568a21cf9850');
                res.body.data[0].should.have.property('code');
                res.body.data[0].code.should.be.a('string')
                res.body.data[0].code.should.equal('SHR-1');
                res.body.data[0].should.have.property('title');
                res.body.data[0].title.should.be.a('string')
                res.body.data[0].title.should.equal('A Study in Scarlet');
                res.body.data[0].should.have.property('author');
                res.body.data[0].author.should.be.a('string')
                res.body.data[0].author.should.equal('Arthur Conan Doyle');
                res.body.data[0].should.have.property('stock');
                res.body.data[0].stock.should.be.a('number')
                res.body.data[0].stock.should.equal(1);
                done()
            });
    });

    // it('Should success create books on /books post', function (done) {
    //     chai.request(app)
    //         .post('/books')
    //         .send({ code: 'FD-1', title: 'Fiska Dasar I', author: 'M. Abdullah' })
    //         .end(function (err, res) {
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             res.should.be.a('object');
    //             res.body.should.have.property('data');
    //             res.body.data.should.be.a('object');
    //             res.body.data.should.have.property('_id');
    //             res.body.data._id.should.be.a('string')
    //             res.body.data.should.have.property('code');
    //             res.body.data.code.should.be.a('string')
    //             res.body.data.code.should.equal('FD-1');
    //             res.body.data.should.have.property('title');
    //             res.body.data.name.should.be.a('string')
    //             res.body.data.name.should.equal('Fisika Dasar I');
    //             res.body.data.should.have.property('author');
    //             res.body.data.name.should.be.a('string')
    //             res.body.data.name.should.equal('M. Abdullah');
    //             res.body.data.should.have.property('stock');
    //             res.body.data.name.should.be.a('integer')
    //             res.body.data.name.should.equal(1);
    //             done()
    //         });
    // });

    // it('Should failed create books on /books post', function (done) {
    //     chai.request(app)
    //         .post('/books')
    //         .send({ code: 'JK-45', title: 'Ekonomi Public', author: 'Y.H. Permana' })
    //         .end(function (err, res) {
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             res.should.be.a('object');
    //             res.body.should.have.property('error');
    //             res.body.error.should.be.a('string');
    //             res.body.data.should.equal('E11000 duplicate key error collection: testdb.books index: code_1 dup key: { code: \"JK-45\" }');
    //             done()
    //         });
    // });

    // it('Should success update books on /books/:_id put', function (done) {
    //     chai.request(app)
    //         .put('/books/666464e29792a57a8898128c')
    //         .send({ code: 'FP-1', title: 'Fundamental Physics I', author: 'Tipler' })
    //         .end(function (err, res) {
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             res.should.be.a('object');
    //             res.body.should.have.property('data');
    //             res.body.data.should.be.a('object');
    //             res.body.data.should.have.property('_id');
    //             res.body.data._id.should.be.a('string');
    //             res.body.data._id.should.equal('666464e29792a57a8898128c')
    //             res.body.data.should.have.property('code');
    //             res.body.data.code.should.be.a('string')
    //             res.body.data.code.should.equal('FP-1');
    //             res.body.data.should.have.property('title');
    //             res.body.data.name.should.be.a('string')
    //             res.body.data.name.should.equal('Fundamental Physics I');
    //             res.body.data.should.have.property('author');
    //             res.body.data.name.should.be.a('string')
    //             res.body.data.name.should.equal('Tipler');
    //             res.body.data.should.have.property('stock');
    //             res.body.data.name.should.be.a('integer')
    //             res.body.data.name.should.equal(1);
    //             done()
    //         });
    // });

    // it('Should failed update book on /book/:_id put', function (done) {
    //     chai.request(app)
    //         .put('/books/666464e29792a57a8898128c')
    //         .send({ code: 'JK-45', title: 'Fundamental Physics I', author: 'Tipler' })
    //         .end(function (err, res) {
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             res.should.be.a('object');
    //             res.body.should.have.property('error');
    //             res.body.error.should.be.a('string');
    //             res.body.error.should.equal('Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: testdb.books index: code_1 dup key: { code: \"JK-45\" }');
    //             done()
    //         });
    // });

    // it('Should success delete books on /books/:_id delete', function (done) {
    //     chai.request(app)
    //         .delete('/books/666464e29792a57a8898128c')
    //         .end(function (err, res) {
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             res.should.be.a('object');
    //             res.body.should.have.property('data');
    //             res.body.data.should.be.a('object');
    //             res.body.data.should.have.property('_id');
    //             res.body.data._id.should.be.a('string');
    //             res.body.data._id.should.equal('666464e29792a57a8898128c')
    //             res.body.data.should.have.property('code');
    //             res.body.data.code.should.be.a('string')
    //             res.body.data.code.should.equal('FP-1');
    //             res.body.data.should.have.property('title');
    //             res.body.data.name.should.be.a('string')
    //             res.body.data.name.should.equal('Fundamental Physics I');
    //             res.body.data.should.have.property('author');
    //             res.body.data.name.should.be.a('string')
    //             res.body.data.name.should.equal('Tipler');
    //             res.body.data.should.have.property('stock');
    //             res.body.data.name.should.be.a('integer')
    //             res.body.data.name.should.equal(1);
    //             done()
    //         });
    // });

    // it('Should failed delete book on /book/:_id delete', function (done) {
    //     chai.request(app)
    //         .delete('/books/666464e29792a57a8898128c')
    //         .end(function (err, res) {
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             res.should.be.a('object');
    //             res.body.should.have.property('error');
    //             res.body.error.should.be.a('string');
    //             res.body.error.should.equal('The member is not exist');
    //             done()
    //         });
    // });

    it('Should success borrow books on /books/borrow/:_id put', function (done) {
        chai.request(app)
            .put('/books/borrow/666464813a9b568a21cf9851')
            .send({ borrowerId: '6664621f343d293c86dc9910' })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('_id');
                res.body.data._id.should.be.a('string');
                res.body.data._id.should.equal('666464813a9b568a21cf9851')
                res.body.data.should.have.property('code');
                res.body.data.code.should.be.a('string');
                res.body.data.code.should.equal('TW-11');
                res.body.data.should.have.property('title');
                res.body.data.title.should.be.a('string');
                res.body.data.title.should.equal('Twilight');
                res.body.data.should.have.property('author');
                res.body.data.author.should.be.a('string');
                res.body.data.author.should.equal('Stephenie Meyer');
                res.body.data.should.have.property('stock');
                res.body.data.stock.should.be.a('number');
                res.body.data.stock.should.equal(0);
                res.body.data.should.have.property('borrowDate');
                res.body.data.borrowDate.should.be.a('string');
                res.body.data.should.have.property('borrowerId');
                res.body.data.borrowerId.should.be.a('string');
                res.body.data.borrowerId.should.equal('6664621f343d293c86dc9910');
                done()
            });
    });

    it('Should failed borrow books on /books/borrow/:_id put', function (done) {
        chai.request(app)
            .put('/books/borrow/666464813a9b568a21cf9853')
            .send({borrowerId: '666460f00669e1d3e64bf74b'})
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

    it('Should failed borrow books on /books/borrow/:_id put', function (done) {
        chai.request(app)
            .put('/books/borrow/666464813a9b568a21cf9852')
            .send({borrowerId: '6664864ec165bed73d3a72b8'})
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

    it('Should failed borrow books on /books/borrow/:_id put', function (done) {
        chai.request(app)
            .put('/books/borrow/666464813a9b568a21cf9853')
            .send({borrowerId: '666460f00669e1d3e64bf74c'})
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

    it('Should success return books on /books/return/:_id put', function (done) {
        chai.request(app)
            .put('/books/return/666464813a9b568a21cf9851')
            .send({ borrowerId: '6664621f343d293c86dc9910' })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('_id');
                res.body.data._id.should.be.a('string');
                res.body.data._id.should.equal('666464813a9b568a21cf9851')
                res.body.data.should.have.property('code');
                res.body.data.code.should.be.a('string');
                res.body.data.code.should.equal('TW-11');
                res.body.data.should.have.property('title');
                res.body.data.title.should.be.a('string');
                res.body.data.title.should.equal('Twilight');
                res.body.data.should.have.property('author');
                res.body.data.author.should.be.a('string');
                res.body.data.author.should.equal('Stephenie Meyer');
                res.body.data.should.have.property('stock');
                res.body.data.stock.should.be.a('number');
                res.body.data.stock.should.equal(1);
                res.body.data.should.have.property('borrowDate');
                done()
            });
    });

    // it('Should failed return books on /books/borrow/:_id put', function (done) {
    //     chai.request(app)
    //         .put('/books/return/666464813a9b568a21cf984f')
    //         .send({borrowerId: '666460f00669e1d3e64bf75r'})
    //         .end(function (err, res) {
    //             res.should.have.status(500);
    //             res.should.be.json;
    //             res.should.be.a('object');
    //             res.body.should.have.property('error');
    //             res.body.error.should.be.a('string');
    //             res.body.error.should.equal('The returner is not the person who borrowed');
    //             done()
    //         });
    // });
})