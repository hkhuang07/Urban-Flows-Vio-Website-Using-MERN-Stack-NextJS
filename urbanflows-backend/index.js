const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // xử lý kết nối frontend - backend
const dotenv = require('dotenv');
const multer = require('multer'); // xử lý tải file
const path = require('path'); // Thêm path để làm việc với đường dẫn tệp tin

// Tải biến môi trường từ file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware để xử lý JSON và form-urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

// Middleware để phục vụ các tệp tĩnh từ thư mục public của frontend. Điều này cho phép trình duyệt truy cập hình ảnh đã tải lên.
app.use(express.static(path.join(__dirname, '../urbanflows-frontend/public')));

// Cấu hình Multer để lưu trữ tệp tin
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Đường dẫn tuyệt đối đến thư mục lưu trữ hình ảnh trong frontend
        const uploadDir = path.join(__dirname, '../urbanflows-frontend/public/uploads');
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Tạo tên tệp tin duy nhất để tránh bị trùng lặp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// === ĐỊNH NGHĨA CÁC ROUTES ===
// Route mới để xử lý tải lên hình ảnh
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded.' });
    }
    // Trả về URL của hình ảnh đã được lưu để frontend có thể sử dụng
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).send({ imageUrl: imageUrl });
});

// Các route hiện có của bạn
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