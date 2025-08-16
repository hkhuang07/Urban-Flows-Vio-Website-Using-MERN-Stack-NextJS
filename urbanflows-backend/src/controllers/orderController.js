const Order = require('../models/Order');
const Account = require('../models/Account');
const OrderItem = require('../models/OrderItem'); // Để tạo/liên kết OrderItems
const Item = require('../models/Item'); // Để giảm số lượng tồn kho

// @desc    Tạo đơn hàng mới (cho khách hàng)
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    const { orderType, items, shippingAddress, paymentMethod, notes, pickupLocation, deliveryLocation, requestedVehicleType, numberOfPassengers, itemDescription, itemWeight, itemDimensions } = req.body;
    const accountId = req.user._id;

    try {
        let totalPrice = 0;
        let orderItems = [];

        // Tính toán tổng giá và tạo OrderItems nếu là 'product_order'
        if (orderType === 'product_order' && items && items.length > 0) {
            for (const orderItemData of items) {
                const item = await Item.findById(orderItemData.itemId);
                if (!item) {
                    return res.status(404).json({ message: `Item with ID ${orderItemData.itemId} not found.` });
                }
                if (item.quantity < orderItemData.quantity) {
                    return res.status(400).json({ message: `Not enough stock for item: ${item.name}. Available: ${item.quantity}` });
                }
                const subtotal = item.price * orderItemData.quantity;
                totalPrice += subtotal;

                // Lưu thông tin chi tiết của OrderItem
                orderItems.push({
                    itemId: item._id,
                    quantity: orderItemData.quantity,
                    priceAtPurchase: item.price,
                    subtotal: subtotal,
                });

                // Giảm số lượng tồn kho của sản phẩm
                item.quantity -= orderItemData.quantity;
                await item.save();
            }
        } else if (orderType === 'shipping_request' || orderType === 'ride_booking') {
            // Đối với dịch vụ vận chuyển/đặt xe, totalPrice có thể được tính toán ở frontend hoặc sau này bởi backend
            // Hiện tại có thể đặt 0 hoặc một giá trị ước tính
            totalPrice = req.body.fare || 0; // Fare sẽ được tính toán chi tiết trong ShippingRequest/RideBooking
        } else {
            return res.status(400).json({ message: 'Invalid order type or missing items for product order.' });
        }

        const order = await Order.create({
            accountId,
            orderType,
            totalPrice,
            shippingAddress: orderType === 'product_order' ? shippingAddress : undefined,
            paymentMethod,
            notes,
            // Các trường khác cho ShippingRequest/RideBooking sẽ được tạo trong các controllers riêng
        });

        // Tạo OrderItems sau khi Order được tạo
        if (orderType === 'product_order' && orderItems.length > 0) {
            const createdOrderItems = await Promise.all(
                orderItems.map(async (item) => {
                    return await OrderItem.create({ ...item, orderId: order._id });
                })
            );
            // Có thể thêm ID của OrderItems vào Order nếu cần
        }

        // Nếu là yêu cầu vận chuyển hoặc đặt xe, tạo bản ghi chi tiết
        if (orderType === 'shipping_request') {
            const ShippingRequest = require('../models/ShippingRequest'); // Import tại đây để tránh lỗi circular dependency
            await ShippingRequest.create({
                orderId: order._id,
                pickupLocation,
                deliveryLocation,
                itemDescription,
                itemWeight,
                itemDimensions,
                fare: totalPrice, // Gán tạm fare đã tính
                requestStatus: 'pending' // Trạng thái ban đầu
            });
        } else if (orderType === 'ride_booking') {
            const RideBooking = require('../models/RideBooking'); // Import tại đây
            await RideBooking.create({
                orderId: order._id,
                pickupLocation,
                destinationLocation,
                requestedVehicleType,
                numberOfPassengers,
                fare: totalPrice, // Gán tạm fare đã tính
                requestStatus: 'pending'
            });
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Lấy tất cả đơn hàng của người dùng (khách hàng/admin)
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ accountId: req.user._id })
            .populate('accountId', 'fullName email') // Lấy thông tin người đặt
            .sort({ createdAt: -1 }); // Sắp xếp theo thời gian mới nhất
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Lấy chi tiết một đơn hàng (khách hàng/admin)
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('accountId', 'fullName email')
            .populate({
                path: 'orderItems', // Nếu bạn quyết định thêm orderItems vào Order schema
                populate: {
                    path: 'itemId',
                    select: 'name price imageUrl'
                }
            });

        if (order) {
            // Đảm bảo chỉ admin hoặc chủ đơn hàng mới có thể xem
            if (req.user.roles.includes('admin') || order.accountId._id.toString() === req.user._id.toString()) {
                res.json(order);
            } else {
                res.status(403).json({ message: 'Not authorized to view this order.' });
            }
        } else {
            res.status(404).json({ message: 'Order not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Lấy tất cả đơn hàng (chỉ admin/manager)
// @route   GET /api/orders
// @access  Private/Admin/Manager
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('accountId', 'fullName email')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Cập nhật trạng thái đơn hàng (chỉ admin/manager/shipper - tùy loại đơn)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin/Manager/Shipper
const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            // Logic kiểm tra quyền và trạng thái chuyển đổi hợp lệ
            if (req.user.roles.includes('admin') || req.user.roles.includes('manager')) {
                order.status = status;
            } else if (req.user.roles.includes('shipper') && (order.orderType === 'shipping_request' || order.orderType === 'ride_booking')) {
                // Cho phép shipper cập nhật các trạng thái liên quan đến giao hàng/chuyến đi
                // Cần kiểm tra shipperId của đơn hàng có khớp với req.user._id hay không
                // Và chỉ cho phép chuyển đổi trạng thái hợp lệ (ví dụ: pending -> accepted -> picked_up -> delivered)
                order.status = status; // Cần thêm logic kiểm tra sâu hơn
            } else {
                return res.status(403).json({ message: 'Not authorized to update this order status.' });
            }

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
};