module.exports = {
    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('message', 'Inicia sesion o registrate para entrar a esta ruta!')
        return res.redirect('/signin');
    },
    isNotloggeIn(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        req.flash('message','Ya estas logeado cierra sesion')
        return res.redirect('/users')
    }
}