var express = require('express');
const BookService = require('../models/services/BookService');
var router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Books:
 *       type: object
 *       required:
 *         - code
 *         - title
 *         - author
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the books
 *         code:
 *           type: string
 *           description: The code of the books
 *         author:
 *           type: string
 *           description: The name of the books
 *         title:
 *           type: string
 *           description: The title of the books
 *         stock:
 *           type: integer
 *           description: The stock of the books
 *         borrowerId:
 *           type: string
 *           description: The id of the books borrower
 *         borrowDate:
 *           type: string
 *           description: The date of the borrowing books
 *         penalty: 
 *           type: object
 *           description: The person charged with the crime and the expiry date
 *       example:
 *         code: JK-45
 *         title: Harry Potter
 *         author: J.K Rowling
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The Books managing API
 */

/**
 * @swagger
 * /books:
 *  get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *        200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Books'
 * 
 *        500:
 *         description: The list of the books failed to load
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Books'
 * 
 *  post:
 *    summary: Creat a new data book
 *    tags: [Books]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *                $ref: '#/components/schemas/Books'
 *    responses:
 *       201:
 *        description: Success created a new data book
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Books'
 * 
 *       500:
 *        description: Failed to created a new data book
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Books'
 * /books/{_id}:
 *  put:
 *     summary: Edit book data
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Books'
 *     responses:
 *       201:
 *        description: Success edit book data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Books'
 * 
 *        500:
 *         description: Failed to edit book data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Books'
 * 
 *  delete:
 *    summary: Delete book
 *    tags: [Books]
 *    parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *            
 *    responses:
 *       201:
 *        description: Success delete book data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Books'
 * 
 *       500:
 *        description: Failed to delete book
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Books'
 * 
 * /books/borrow/{_id}:
 *  put:
 *     summary: Borrowing book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                  -borrowerId
 *             example: 
 *                  borrowerId: 6663e21a068728d63b20f544
 *     responses:
 *       201:
 *        description: Success in borrowing books
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Books'
 * 
 *        500:
 *         description: Failed to borrow books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Books'
 * 
 * /books/return/{_id}:
 *  put:
 *     summary: Returning book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                  -borrowerId
 *             example: 
 *                  borrowerId: 6663e21a068728d63b20f544
 *     responses:
 *       201:
 *        description: Successfully returned the book
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Books'
 * 
 *        500:
 *         description: Failed to return book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Books'
 */

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const data = await BookService.find()
    res.status(200).json({data});
  } catch (err) {
    res.status(500).json({ err })
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { code, title, author } = req.body
    const data = await BookService.creat({ code, title, author })
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ err })
  }
});

router.put('/:_id', async function (req, res, next) {
  try {
    const _id = req.params._id
    const { code, title, author } = req.body
    const data = await BookService.update(_id, { code, title, author})
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ err })
  }
});

router.delete('/:_id', async function (req, res, next) {
  try {
    const _id = req.params._id
    const data = await BookService.remove(_id)
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ err })
  }
});

router.put('/borrow/:_id', async function (req, res, next) {
    try {
      const _id = req.params._id
      const { borrowerId } = req.body
      const data = await BookService.borrow(_id, borrowerId)
      res.status(201).json({ data });
    } catch (err) {
      res.status(500).json({ err })
    }
  });

  router.put('/return/:_id', async function (req, res, next) {
    try {
      const _id = req.params._id
      const { borrowerId } = req.body
      const data = await BookService.return(_id, borrowerId)
      res.status(201).json({ data });
    } catch (err) {
      res.status(500).json({ err })
    }
  });

module.exports = router;
