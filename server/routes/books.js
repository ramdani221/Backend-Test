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
 */

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    res.status(200).json(await BookService.find());
  } catch (error) {
    res.status(500).json({ error })
  }
});

/**
 * @swagger
 * /books: 
 *   post:
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
 */

router.post('/', async function (req, res, next) {
  try {
    const { code, title, author } = req.body
    res.status(201).json(await BookService.creat({ code, title, author }));
  } catch (error) {
    res.status(500).json({ error })
  }
});

/**
 * @swagger
 * /books/{code}:
 *  put:
 *     summary: Edit book data
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The book code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              required: 
 *                 - title
 *                 - author
 *              example: 
 *                 title: Herry Potter
 *                 author: J.K Rowling
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
 */

router.put('/:code', async function (req, res, next) {
  try {
    const code = req.params.code
    const input = req.body
    res.status(201).json(await BookService.update(code, input));
  } catch (error) {
    res.status(500).json({ error })
  }
});

/**
 * @swagger
 * /books/{code}:
 *  delete:
 *    summary: Delete book
 *    tags: [Books]
 *    parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The book code
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
 */

router.delete('/:code', async function (req, res, next) {
  try {
    const code = req.params.code
    res.status(201).json(await BookService.remove(code));
  } catch (error) {
    res.status(500).json({ error })
  }
});

/**
 * @swagger
 * /books/borrow/{code}:
 *  put:
 *     summary: Borrowing book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The book code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                  -borrowerCode
 *             example: 
 *                  borrowerCode: 6663e21a068728d63b20f544
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
 */

router.put('/borrow/:code', async function (req, res, next) {
    try {
      const code = req.params.code
      const {borrowerCode} = req.body
      res.status(201).json(await BookService.borrow(code, borrowerCode));
    } catch (error) {
      res.status(500).json({ error })
    }
  });

 /**
 * @swagger
 * /books/return/{code}:
 *  put:
 *     summary: Returning book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The book code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                  -borrowerCode
 *             example: 
 *                  borrowerCode: 6663e21a068728d63b20f544
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

  router.put('/return/:code', async function (req, res, next) {
    try {
      const code = req.params.code
      const { borrowerCode } = req.body
      res.status(201).json(await BookService.return(code, borrowerCode));
    } catch (error) {
      res.status(500).json({ error })
    }
  });

module.exports = router;
