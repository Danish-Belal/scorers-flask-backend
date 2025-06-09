const bcrypt = require('bcrypt');

const hashed = async(password)=>{
    return await bcrypt.hash(password,10);
    
}

const comparePassword = async(password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword);

}

module.exports = {hashed, comparePassword}