import { Request, Response } from 'express';
import Order from '../model/order.model';

const getALlMoney = async (req: Request, res: Response) => {
	try {
		//const order = await Order.find({});
		res.status(200).json({ data: 'hello' });
	} catch (err) {}
};

export default {
	getALlMoney,
};
