const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const sendRoutes = require('./routes/sendRoutes');
const homeRoutes = require('./routes/homeRoutes');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: ['http://127.0.0.1:3001', 'http://127.0.0.1:5500']
}));

app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});