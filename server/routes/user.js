const express = require('express')
const router = express.Router()
const User = require("../database/models").User;
const passport = require("../passport");

// /api/user routes

// /api/user/ see if user is logged in
router.get("/",(req,res)=>{
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
});

// /api/user/signup adds a new user
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

// /api/user/login validates user login
router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})


module.exports = router;