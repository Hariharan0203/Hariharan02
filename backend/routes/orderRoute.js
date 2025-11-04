import express from 'express';
import {placeOrder,placeOrderRazorpay,alleOrders,userOrders,updateStatus, verifyRazorpay} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/Auth.js'


const orderRouter = express.Router()

// Admin 
orderRouter.post('/list',adminAuth,alleOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment 
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// user Feature
orderRouter.post('/userorders',authUser,userOrders)

//verify payment
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default orderRouter