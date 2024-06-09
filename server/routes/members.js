var express = require('express');
const MemberService = require('../models/services/MemberService');
var router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Members:
 *       type: object
 *       required:
 *         - code
 *         - name
 *       properties:
 *         code:
 *           type: string
 *           description: The code of the member
 *         name:
 *           type: string
 *           description: The name of the member
 *       example:
 *         code: M001
 *         name: Agus
 *     Error:
 *        type: object
 *        required: 
 *          - error
 *        properties:
 *          error:
 *            type: string
 *            description: Cause of error
 *        example:
 *          error: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: The Members managing API
 */

/**
 * @swagger
 * /members:
 *  get:
 *     summary: Returns the list of all the members
 *     tags: [Members]
 *     responses:
 *        200:
 *         description: The list of the members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Members'
 * 
 *        500:
 *         description: The list of the members failed to load
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Error'
 */

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    res.status(200).json(await MemberService.find());
  } catch (error) {
    res.status(500).json({ error })
  }
});

/**
 * @swagger
 * /members:
 *  post:
 *    summary: Creat a new data member
 *    tags: [Members]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *               $ref: '#/components/schemas/Members'
 *                  
 *    responses:
 *       201:
 *        description: Success created a new data member
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Members'
 * 
 *       500:
 *        description: Failed to created a new data member
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Error'
 */

router.post('/', async function (req, res, next) {
  try {
    const { code, name } = req.body
    res.status(201).json(await MemberService.creat({ code, name }));
  } catch (error) {
    res.status(500).json({ error })
  }
});

/**
 * @swagger
 * /members/{code}:
 *  put:
 *     summary: Edit member data
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The member code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *                  -name
 *             example: 
 *                name: Agus
 *     responses:
 *       201:
 *        description: Success edit member data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Members'
 * 
 *        500:
 *         description: Failed to edit member data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Error'
 */

router.put('/:code', async function (req, res, next) {
  try {
    const code = req.params.code
    const name = req.body
    res.status(201).json(await MemberService.update(code, name));
  } catch (error) {
    res.status(500).json({ error })
  }
});

/**
 * @swagger
 * /members/{code}:
 *  delete:
 *    summary: Delete member
 *    tags: [Members]
 *    parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The member code
 *            
 *    responses:
 *       201:
 *        description: Success delete member data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Members'
 * 
 *       500:
 *        description: Failed to delete member
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Error'
 */

router.delete('/:code', async function (req, res, next) {
  try {
    const code = req.params.code
    res.status(201).json(await MemberService.remove(code));
  } catch (error) {
    res.status(500).json({ error })
  }
});

module.exports = router;
