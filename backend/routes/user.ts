import express from 'express';
const router = express.Router();
const userController=require('../controllers/user')
router.route("/signUp").post(userController.signUp)
router.route("/signIn").post(userController.signIn)




module.exports =router