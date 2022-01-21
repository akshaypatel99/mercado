import { Schema, Types, model } from 'mongoose';

const orderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				productId: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		deliveryAddress: {
			address: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			postcode: {
				type: String,
				required: true,
			},
		},
		deliveryDate: {
			type: String,
			required: true,
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		paymentResult: {
			id: {
				type: String,
			},
			status: {
				type: String,
			},
			update_time: {
				type: String,
			},
			email_address: {
				type: String,
			},
		},
		trolleyTotal: {
			type: Number,
			required: true,
			default: 0.0,
		},
		deliveryPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const OrderModel = model('Order', orderSchema);

export default OrderModel;
