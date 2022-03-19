const passport = require('passport');
const strategy = require('passport-local').Strategy
const db = require('../database')
const helps = require('../lib/helps')


passport.use('local.signin', new strategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback: true
}, async (req,username,password,done) => {
    const rows = await db.query('SELECT * FROM users Where username = ?',[username]);
    if(rows.length > 0){
        const user = rows[0];
        const validPass = await helps.matchLogin(password,user.password);
        if(validPass){
            done(null,user,req.flash('success',`Bienvenido de nuevo ${user.username}!`))
        }else{
            done(null,false, req.flash('message', 'Contraseña incorrecta!'))
        }
    }else{
        done(null,false, req.flash('message','No existe este usuario'))
    }
}))

passport.use('local.signub', new strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,username,password,done) =>{
    const {nickname} = req.body
    const newData ={
        username,
        password,
        nickname
    }
    newData.password = await helps.encryptPassword(password)
    const results = await db.query('INSERT INTO users SET ?', [newData])
    newData.id = results.insertId 
    return done(null, newData);
}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    const rows = await db.query('SELECT * FROM users Where id = ?',[id]);
    done(null,rows[0]);
})