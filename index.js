const express = require('express');
const cors = require('cors');
const jwt =  require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes= require('./routes/auth')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT||500;

app.listen(PORT, ()=>{
   console.log(`Server running on http://localhost:${PORT}`);
    
})