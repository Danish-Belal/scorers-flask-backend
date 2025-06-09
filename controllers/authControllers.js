const pool = require('../db');
const jwt = require('jsonwebtoken');
const {hashed, comparePassword } = require('../utils/hash')

require('dotenv').config();


const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


const signup = async(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password);
    

    try{
        const userExits = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
        console.log(userExits);
        
        if(userExits.rows.length>0){
            return res.status(400).json({
                message:"User already exit"
            })
        }

        const hassPass = await hashed(password);
        const result = await pool.query(
            `INSERT INTO users(email,password,provider) VALUES($1,$2,$3) RETURNING id,email`,[email,hassPass,'email']
        )
        const user = result.rows[0];
        
        
        const token = generateToken(user.id);

        res.status(201).json({
            user,token
        })

    }catch(err){
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Internal server error' });

    }
}


const login = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const result = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
        const user = result.rows[0];
        if(!user || !user.password){
            return res.status(400).json(
                {
                    message: "No User found"
                }
            )

        }
        const isPasswwordMatched = await comparePassword(password,user.password);
        if(!isPasswwordMatched){
             return res.status(401).json(
                {
                    message: "Invalid Password, Try Again"
                }
            )
        }

        const token = generateToken(user.id);
        res.status(201).json({
            user,token
        })



    }catch(err){
        console.log("Login Error",err);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports = {login,signup};