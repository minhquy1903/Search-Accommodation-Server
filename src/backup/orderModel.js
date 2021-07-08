const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
	total: Number,
	typePost: Number,
	idPost: String,
	date: Date,
	numberDay: Number,
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		require: true,
	},
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
