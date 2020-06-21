const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next){
    let token = req.header('auth-token');
    if(!token) return res.send('access denied!!');

    try {
        let verified = jwt.verify(token,'shhhhh');
        req.user = verified;
        next();
    } catch (error) {
        res.send('Invalid Token!');
    }

}