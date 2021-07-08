import express from 'express';
import controller from '../controller/index.controller';
const orderRouter = express.Router();

orderRouter
	.get('/all-money', controller.orderController.getALlMoney)
	.get('/getByUserId/:id', controller.orderController.getOrderByIdUser)
	.post('/createOrder', controller.orderController.createOrder)
	.get('/all', controller.orderController.getAllOrder);

export default orderRouter;
