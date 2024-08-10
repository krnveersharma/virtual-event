import express from 'express';
const router = express.Router();
const eventController=require('../controllers/event')
router.route('/make-event').post( eventController.makeEvent);

module.exports=router;