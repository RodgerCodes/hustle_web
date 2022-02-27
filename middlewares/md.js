module.exports = {
    Auth:(req, res, next) => {
        if(req.isAuthenticated()){
            return  next();
        }

        res.status(401).redirect('/login')
    },

    Guest:(req, res, next) => {
        if(req.isAuthenticated()){
            res.redirect('/home')
        }

        return next();
    }
}