const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Tải biến môi trường từ file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;-+

// Middleware để xử lý JSON trong body của request
app.use(express.json());

app.use('/api/accounts', require('./src/routes/accountRoutes'));
app.use('/api/accounts', require('./src/routes/accountRoutes'));
app.use('/api/categories', require('./src/routes/categoryRoutes'));
app.use('/api/manufacturers', require('./src/routes/manufacturerRoutes'));
app.use('/api/items', require('./src/routes/itemRoutes'));
app.use('/api/orders', require('./src/routes/orderRoutes'));
app.use('/api/orderitems', require('./src/routes/orderitemRoutes'));
app.use('/api/topics', require('./src/routes/topicRoutes'));
app.use('/api/articles', require('./src/routes/articleRoutes'));
app.use('/api/shipperprofiles', require('./src/routes/ShipperProfileRoutes'));
app.use('/api/ridebookings', require('./src/routes/rideBookingRoutes'));

// Kết nối đến MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB Atlas');
    } catch (error) {
        console.error('❌ Could not connect to MongoDB:', error.message);
        process.exit(1); 
    }
};
connectDB();

// Định nghĩa một route cơ bản để kiểm tra server
app.get('/', (req, res) => {
    res.send('UrbanFlows Backend API is running!');
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});