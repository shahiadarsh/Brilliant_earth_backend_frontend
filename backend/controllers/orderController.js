import Order from '../models/orderModel.js';

export const createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ status: 'fail', message: 'No order items' });
        }

        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json({ status: 'success', data: { order: createdOrder } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'firstName lastName email');

        if (!order) {
            return res.status(404).json({ status: 'fail', message: 'Order not found' });
        }

        res.status(200).json({ status: 'success', data: { order } });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error.message });
    }
};

export const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address
            };

            const updatedOrder = await order.save();
            res.status(200).json({ status: 'success', data: { order: updatedOrder } });
        } else {
            res.status(404).json({ status: 'fail', message: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json({ status: 'success', data: { orders } });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id firstName lastName');
        res.status(200).json({ status: 'success', data: { orders } });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error.message });
    }
};
