const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const registerRouter = require('../routes/register');
const { connectRedis } = require('../db/redis_connect');

const app = express();
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);
app.use(cookieParser());
app.use(express.json())

app.use(express.urlencoded({ extended: false }));

app.use('/register', registerRouter);

connectRedis();

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
