const express = require(`express`);
const router = express.Router();
const passport = require('passport')
const { isLoggedIn,isNotloggeIn } = require('../lib/auth')

router.get('/signub', isNotloggeIn,(req,res)=>{
    res.render('auth/register')
})
router.post('/signub',passport.authenticate('local.signub',{
    successRedirect: '/profile',
    failureRedirect: '/register',
    failureFlash: true
}));
router.get('/signin',isNotloggeIn,(req,res)=>{
    res.render('auth/login');
})
router.post('/signin',(req,res,next)=>{
    passport.authenticate('local.signin',{
        successRedirect:'/profile',
        failureRedirect:'/signin',
        failureFlash: true
    })(req,res,next);
})
router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('users/profile')
})
router.get('/logout', (req,res)=>{
    req.logOut();
    res.redirect('/signin')
})
module.exports = router;