import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
	total: Number,
	typePost: Number,
	idPost: String,
	date: Date,
	numberDay: Number,
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	},
});

const Order = mongoose.model<any>('Order', OrderSchema);

export default Order;
