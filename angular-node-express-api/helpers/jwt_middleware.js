
const jwt = require('jsonwebtoken');

const jwtSecret = 'c67dbd36-1160-433f-bff5-f0d7b77e9dfc';

const WithJWTAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, jwtSecret, (err, content) => {
            if (err) {
                return res.status(403).json({ error: 'Provided JWT is invalid' });
            }

            req.user = content;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {
    jwtSecret,
    WithJWTAuth
}