const express = require("express");
const router = express.Router();
const db = require('../model/collections')
const bcrypt = require('bcrypt');
const middleware = require("../controller/middleware")
/* GET home page. */
const JWT = require('jsonwebtoken')

router.post("/register", async function (req, res, next) {
    const username = req.body.username || ""
    const password = req.body.password  || ""

    const result =  db.users.find({username}, async (err,data)=>{
      if(err || data.length != 0){
        next({status: 400 , message : "Duplicate usename !"})
      }else{
        bcrypt.hash(password, 10, async (err, hash) => {
          const users = db.users;
          const user = new users({
            username,
            password: hash
          })
          user.save((err, result) => {
    
            if (err) {
              next(err)
            } else {
              res.send(200)
              result.speak();
            }
          })
      })
      }
    })
});

router.post('/login', middleware.loginMiddleware ,(req, res, next) => {
    const username = req.body.username;
    const SCRET = process.env.jwt_secret || "ZerotoHero";
    const payload = {
        exp: new Date().getTime() / 1000 + 60 * 60,
        sub: username,
        iat: new Date().getTime()
    }
    res.send({token :JWT.sign(payload, SCRET) });
  
});
  
router.get('/mydata',middleware.verify_token,(req,res)=>{
res.send(req.username)
})

module.exports = router;
