const jwt = require('jsonwebtoken');
require("dotenv").config();
exports.authenticatetoken= (req, res, next) => {
    const token = req.cookies.jwt;
    if (token == null)
    {
        res.redirect('/login');
    }
    else
    {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err)
            {
                return res.sendStatus(403);
            }
            {
                req.user = user;
                next();
            }

        });
    }


}

