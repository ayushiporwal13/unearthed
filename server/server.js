import './config/dotenv.js';
import express from 'express';
import giftsRouter from './routes/gifts.js';

const app = express();

const PORT = process.env.PORT || 3001;

app.use('/public', express.static('./public')); //defined a middleware function to serve static files from the public directory.
app.use('/scripts', express.static('./public/scripts')) //defined a middleware function to serve static files from the public/scripts directory.
app.use('/gifts', giftsRouter); //defined a middleware function to use the giftsRouter for any requests to /gifts.

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;"> UnEartherd API </h1>');
});


app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

