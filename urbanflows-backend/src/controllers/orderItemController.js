const OrderItem = require('../models/OrderItem');
const Order = require('../models/Order');
const Item = require('../models/Item');

// @desc    Lấy tất cả OrderItems của một đơn hàng cụ thể
// @route   GET /api/orders/:orderId/items
// @access  Private (Chủ đơn hàng, Admin, Manager)
const getOrderItemsByOrderId = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        // Kiểm tra quyền: chỉ chủ đơn hàng, admin hoặc manager mới được xem
        if (req.user.roles.includes('admin') || req.user.roles.includes('manager') || order.accountId.toString() === req.user._id.toString()) {
            const orderItems = await OrderItem.find({ orderId: req.params.orderId })
                .populate('itemId', 'name imageUrl price'); // Populate thông tin sản phẩm
            res.json(orderItems);
        } else {
            res.status(403).json({ message: 'Not authorized to view these order items.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Lấy chi tiết một OrderItem (cho mục đích quản lý/debug)
// @route   GET /api/orderitems/:id
// @access  Private (Admin, Manager)
const getOrderItemById = async (req, res) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id)
            .populate('orderId', 'accountId orderDate')
            .populate('itemId', 'name imageUrl price');
        if (orderItem) {
            // Có thể thêm kiểm tra quyền dựa trên orderId.accountId
            res.json(orderItem);
        } else {
            res.status(404).json({ message: 'OrderItem not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Cập nhật OrderItem (chỉ admin/manager - trong trường hợp sửa đơn hàng)
// @route   PUT /api/orderitems/:id
// @access  Private/Admin/Manager
const updateOrderItem = async (req, res) => {
    const { quantity } = req.body;
    try {
        const orderItem = await OrderItem.findById(req.params.id);
        if (orderItem) {
            const oldQuantity = orderItem.quantity;
            orderItem.quantity = quantity !== undefined ? quantity : oldQuantity;
            
            const item = await Item.findById(orderItem.itemId);
            if (!item) return res.status(404).json({ message: 'Linked item not found.' });

            // Điều chỉnh số lượng tồn kho
            const quantityDifference = oldQuantity - orderItem.quantity; // Nếu giảm quantity thì stock tăng
            item.quantity += quantityDifference;
            await item.save();

            orderItem.subtotal = item.price * orderItem.quantity; // Cập nhật subtotal
            
            const updatedOrderItem = await orderItem.save();
            res.json(updatedOrderItem);
        } else {
            res.status(404).json({ message: 'OrderItem not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Xóa OrderItem (chỉ admin/manager)
// @route   DELETE /api/orderitems/:id
// @access  Private/Admin/Manager
const deleteOrderItem = async (req, res) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id);
        if (orderItem) {
            // Tăng lại số lượng tồn kho của sản phẩm khi xóa OrderItem
            const item = await Item.findById(orderItem.itemId);
            if (item) {
                item.quantity += orderItem.quantity;
                await item.save();
            }
            await orderItem.deleteOne();
            res.json({ message: 'OrderItem removed.' });
        } else {
            res.status(404).json({ message: 'OrderItem not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

module.exports = {
    getOrderItemsByOrderId,
    getOrderItemById,
    updateOrderItem,
    deleteOrderItem
};