import { Request, Response } from 'express';
import Order from '../model/order.model';

const checkTypePostMoney = (typePost: number) => {
	if (typePost === 1) return 50000;
	else if (typePost === 2) return 30000;
	else if (typePost === 3) return 20000;
	else if (typePost === 4) return 10000;
	else return 2000;
};

const getALlMoney = async (req: Request, res: Response) => {
	const { province, district, ward, area, type, retail } = req.body;
	const yearNow: any = req.query.year || 2021;

	console.log(yearNow);

	try {
		let dataTotal = [];
		let allPrice: any; //= null;
		for (let i = 0; i <= 11; i++) {
			allPrice = await Order.aggregate([
				{
					$match: {
						date: {
							$gte: new Date(Date.UTC(yearNow, i)),
							$lt: new Date(Date.UTC(yearNow, i + 1)), //datenew Date(`2021-${2}`),
						},
					},
				},
				{
					$group: {
						_id: {
							year: { $year: '$date' },
							month: { $month: '$date' },
						},
						total: { $sum: '$total' },
					},
				},
				{
					$project: {
						_id: 0,
						total: 1,
						month: { $sum: [i + 1, 0] },
					},
				},
			]);
			// let sum = 0;
			// for (let j = 0; j < allPrice.length; j++) {
			// 	let start = new Date(allPrice[j].timeStart);
			// 	let end = new Date(allPrice[j].timeEnd);
			// 	let countDate = Math.abs(start.getTime() - end.getTime());
			// 	countDate = Math.floor(countDate / (1000 * 3600 * 24));
			// 	let moneyOneDate = checkTypePostMoney(allPrice[j].typePost);
			// 	sum += moneyOneDate * countDate;
			// }
			// if (allPrice.length !== 0) {
			// 	let objectReal = {
			// 		total: sum,
			// 		month: i,
			// 	};
			// 	dataTotal.push(objectReal);
			// } else {
			// 	let objectFake = {
			// 		total: 0,
			// 		month: i,
			// 	};
			// 	dataTotal.push(objectFake);
			// }

			if (allPrice.length !== 0) {
				//console.log(allPrice[0]);

				dataTotal.push(allPrice[0]);
			} else {
				let fakeResult = {
					total: 0,
					month: i + 1,
				};
				dataTotal.push(fakeResult);
			}
		}

		const response: any = {
			result: true,
			data: dataTotal, //dataTotal,
			error: false,
		};

		res.status(200).json({ data: response });
	} catch (error) {
		res.status(500).json({ error });
	}
};

const getOrderByIdUser = async (req: Request, res: Response) => {
	try {
		const result = await Order.find({
			user_id: req.params.id,
		});

		const response: any = {
			result: true,
			data: result,
			error: false,
		};

		res.status(200).json({ data: response });
	} catch (error) {
		res.status(500).json({ error });
	}
};

const getAllOrder = async (req: Request, res: Response) => {
	const { province, district, ward, area, type, retail } = req.body;
	try {
		const page: any = req.query.page || 1;
		const limit: any = req.query.limit || 15;
		const startIndex = (page - 1) * limit;
		const totalPage = await Order.countDocuments();
		const result = await Order.find({})
			.populate({
				path: 'user_id',
				select: 'name phone',
			})
			.skip(startIndex)
			.limit(limit);

		const response: any = {
			result: true,
			data: result,
			allPages: totalPage,
			error: false,
		};

		res.status(200).json({ data: response });
	} catch (error) {
		res.status(500).json({ error });
	}
};

const createOrder = async (req: Request, res: Response) => {
	const { total, typePost, idPost, numberDay, user_id } = req.body;
	let timeNow = new Date();
	let timeAddGMT = new Date(
		timeNow.getTime() + -timeNow.getTimezoneOffset() * 60000,
	);
	try {
		const order = new Order({
			total,
			typePost,
			idPost,
			date: timeAddGMT,
			numberDay,
			user_id,
		});
		await order.save();
		const response: any = {
			result: true,
			data: order,
			error: false,
		};

		res.status(200).json({ data: response });
	} catch (error) {
		res.status(500).json({ error });
	}
};

export default {
	getALlMoney,
	getOrderByIdUser,
	createOrder,
	getAllOrder,
};
