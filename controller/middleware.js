const db = require('../model/collections');
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const loginMiddleware = async (req, res, next) => {
    const username = req.body.username || "0";
    const password = req.body.password || "0";
    db.users.find({
        username
    }, (err, data) => {
        if (err || data.length == 0) {
            res.send(401)
        } else {
            (bcrypt.compare(password, data[0].password))
            .then((out) => {
                if (out) {
                    next(); 
                } else {
                    res.send(401)
                }
            })
        }

    })
}

const verify_token = (req, res, next) => {
    const secret = process.env.jwt_secret || "ZerotoHero"
    const token = req.headers.authorization || "0";
    JWT.verify(token,secret, (err, payload) => {
        if (err) {
            res.send(401);
        } else {
            req.username = payload.sub;
            next();
        }
    });
}

module.exports = {verify_token,loginMiddleware};