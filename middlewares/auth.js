const jwt = require('jsonwebtoken');
const config = require('config'); 

const verifyToken = (req, res, next) => {
    const token = req.get("Authorization");
    console.log(token);
    try{
        if(!token) {
            // console.log(token);
            return res.status(401).json({error : "Access denied. Please Login first ! "});
        }
        const decoded = jwt.verify(token , config.get('JWT_SECRET'));
        req.user = decoded;
        console.log(req.user);
        next();
    }
    catch(ex){
        res.status(400).json({error : "Invalid token ! "});
    }
    
}

module.exports = verifyToken;