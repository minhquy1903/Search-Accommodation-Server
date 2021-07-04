import express from 'express';
import controller from '../controller/index.controller';
const orderRouter = express.Router();

orderRouter.get('/all-money', controller.orderController.getALlMoney);

export default orderRouter;
