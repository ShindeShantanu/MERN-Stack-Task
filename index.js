import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bodyParser from 'body-parser';
import ConnectDB from './db.js';
const app = express();

app.use(bodyParser.json());

ConnectDB();

app.use(express.json());
app.use(cors())


const transctionModel = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    dateOfSale: Date,
    sold: Boolean
},
    { timestamps: true }
);

app.get('/data', async (req, res) => {
    try {
        const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
        const response = await axios.get(url);
        const data = response.data;

        await transctionModel.deleteMany({});

        await transctionModel.insertMany(data.map(item => ({
            title: item.title,
            description: item.description,
            price: item.price,
            category: item.category,
            dateOfSale: new Date(item.dateOfSale),
            sold: item.sold
        })));

        res.json({
            message: 'Data initialized successfully',
            data
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})