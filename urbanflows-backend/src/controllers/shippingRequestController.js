const ShippingRequest = require('../models/ShippingRequest');
const Order = require('../models/Order');
const ShipperProfile = require('../models/ShipperProfile');

// @desc    Lấy tất cả yêu cầu vận chuyển (có thể lọc theo trạng thái, vị trí)
// @route   GET /api/shipping-requests
// @access  Public (để hiển thị cho tài xế tìm đơn) / Private (admin/manager)
const getShippingRequests = async (req, res) => {
    try {
        //Params để lọc theo status, location, shipperId, v.v.
        const requests = await ShippingRequest.find({})
            .populate('orderId', 'accountId orderDate status')
            .populate('shipperId', 'accountId vehicleType currentLocation');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Lấy chi tiết yêu cầu vận chuyển
// @route   GET /api/shipping-requests/:id
// @access  Private (Chủ yêu cầu, Shipper được gán, Admin, Manager)
const getShippingRequestById = async (req, res) => {
    try {
        const request = await ShippingRequest.findById(req.params.id)
            .populate('orderId', 'accountId orderDate status')
            .populate('shipperId', 'accountId vehicleType currentLocation');

        if (request) {
            // Kiểm tra quyền
            const order = await Order.findById(request.orderId._id);
            if (req.user.roles.includes('admin') || req.user.roles.includes('manager') ||
                (order && order.accountId.toString() === req.user._id.toString()) ||
                (request.shipperId && request.shipperId.accountId.toString() === req.user._id.toString())
            ) {
                res.json(request);
            } else {
                res.status(403).json({ message: 'Not authorized to view this shipping request.' });
            }
        } else {
            res.status(404).json({ message: 'Shipping request not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Cập nhật yêu cầu vận chuyển (admin/manager, hoặc shipper cập nhật trạng thái)
// @route   PUT /api/shipping-requests/:id
// @access  Private/Admin/Manager/Shipper
const updateShippingRequest = async (req, res) => {
    const { requestStatus, shipperId, fare, estimatedTime } = req.body;
    try {
        const request = await ShippingRequest.findById(req.params.id);
        if (request) {
            // Chỉ admin/manager hoặc shipper được gán mới có thể cập nhật
            if (req.user.roles.includes('admin') || req.user.roles.includes('manager') ||
                (request.shipperId && request.shipperId.toString() === req.user.shipperProfile._id.toString())
            ) {
                request.requestStatus = requestStatus || request.requestStatus;
                request.shipperId = shipperId || request.shipperId;
                request.fare = fare || request.fare;
                request.estimatedTime = estimatedTime || request.estimatedTime;

                // Cập nhật trạng thái của Order liên quan
                const order = await Order.findById(request.orderId);
                if (order) {
                    order.status = requestStatus; // Đồng bộ trạng thái
                    await order.save();
                }

                const updatedRequest = await request.save();
                res.json(updatedRequest);
            } else {
                res.status(403).json({ message: 'Not authorized to update this shipping request.' });
            }
        } else {
            res.status(404).json({ message: 'Shipping request not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// @desc    Xóa yêu cầu vận chuyển (chỉ admin/manager)
// @route   DELETE /api/shipping-requests/:id
// @access  Private/Admin/Manager
const deleteShippingRequest = async (req, res) => {
    try {
        const request = await ShippingRequest.findById(req.params.id);
        if (request) {
            // Cũng cần xóa Order liên quan nếu Order đó chỉ phục vụ cho request này
            await request.deleteOne();
            res.json({ message: 'Shipping request removed.' });
        } else {
            res.status(404).json({ message: 'Shipping request not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

module.exports = {
    getShippingRequests,
    getShippingRequestById,
    updateShippingRequest,
    deleteShippingRequest
};