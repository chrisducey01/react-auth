const express = require('express')
const router = express.Router()
const User = require("../database/models").User;

// /api/user routes

router.post("/signup",(req,res)=>{
    console.log(req.body);
    const {username,password} = req.body;
    User.create({
        username:username, 
        password:password
    })
    .then(dbData=>{
        console.log(dbData);
        res.json(dbData)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;