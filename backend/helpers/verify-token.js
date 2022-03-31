const jwt = require('jsonwebtoken');
const getToken = require('./get-token');

// Middleware to validate token
const checkToken = (req, res, next) => {

    if(!req.headers.authorization){
        return res.status(401).json({message: "Acesso negado!"});
    }

    const token = getToken(req);

    if(!token){
        return res.status(401).json({message: "Acesso negado!"});
    }

    try {
        const verified = jwt.verify(token, `${process.env.SECRET_VALUE}`);
        req.user = verified;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "Acesso negado!"});
    }
}

module.exports = checkToken;