const jwt = require('jsonwebtoken');
const config = require('config'); 

const verifyToken = (req, res, next) => {
    const token = req.header('token');
    if(!token) {
        req.user = null;
        return res.status(401).json({error : "Access denied. Please Login first ! "});
    }

    try{
        const decoded = jwt.verify(token , config.get('JWT_SECRET'));
        req.user = decoded;
        next();
    }
    catch(ex){
        res.status(400).json({error : "Invalid token ! "});
    }
    
}

module.exports = verifyToken;