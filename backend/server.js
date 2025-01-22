import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/products', productRoutes);

//app.get('/', (req, res) => {
//    res.send('Server is ready');
//});

//console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on http://localhost:' + PORT);
});

//ijkHAMMKaxsmBGTX