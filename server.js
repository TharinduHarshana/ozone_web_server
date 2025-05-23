const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();



const authRoutes = require('./routes/auth/auth-routes');
const adminProductRouter = require("./routes/admin/products-routes");
const shopProductRouter = require("./routes/shop/product-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopaddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes")
const adminOrderRouter = require("./routes/admin/order-routes");
const searchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");




mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB connection error:", err));


const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('running Api');
}
);

app.use(
  cors({
    origin: [
      "https://ozone-web-front.vercel.app", // Correct origin
      "https://vercel.com/tharinduharshanas-projects/ozone-web-front/HXCTNxZGcxWH9tbyRKkyNgG3sC5i",
       // Additional origin that needs to be allowed
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin/products', adminProductRouter);
app.use('/api/shop/products', shopProductRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopaddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/admin/orders', adminOrderRouter);
app.use('/api/shop/search', searchRouter);
app.use("/api/shop/review", shopReviewRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;