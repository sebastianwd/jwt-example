const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.query.api_key;
    if (typeof token !== 'undefined') {
        jwt.verify(token, "secretkey", (err, authData) => {
            if (err) {
                res.sendStatus(403);
                return;
            }
            res.json({
                authData
            })
        })
    } else {
        res.json({
            message: "you need an api key -__-"
        })
    }
}


exports.logger = function (req, res, next) {
    console.log('logging')

    verifyToken(req, res, next);
}