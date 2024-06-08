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
 *         _id:
 *           type: string
 *           description: The auto-generated id of the member
 *         code:
 *           type: string
 *           description: The code of the member
 *         name:
 *           type: string
 *           description: The name of the member
 *       example:
 *         code: M001
 *         name: Agus
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
 *                 $ref: '#/components/schemas/Members'
 * 
 *  post:
 *    summary: Creat a new data member
 *    tags: [Members]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *                $ref: '#/components/schemas/Members'
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
 *                $ref: '#/components/schemas/Members'
 * /members/{_id}:
 *  put:
 *     summary: Edit member data
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The member id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Members'
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
 *                 $ref: '#/components/schemas/Members'
 * 
 *  delete:
 *    summary: Delete member
 *    tags: [Members]
 *    parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The member id
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
 *                $ref: '#/components/schemas/Members'
 */

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const data = await MemberService.find()
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error })
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { code, name } = req.body
    const data = await MemberService.creat({ code, name })
    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error })
  }
});

router.put('/:_id', async function (req, res, next) {
  try {
    console.log(req.body)
    const _id = req.params._id
    const { code, name } = req.body
    const data = await MemberService.update(_id, { code, name })
    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error })
  }
});

router.delete('/:_id', async function (req, res, next) {
  try {
    const _id = req.params._id
    const data = await MemberService.remove(_id)
    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error })
  }
});

module.exports = router;
