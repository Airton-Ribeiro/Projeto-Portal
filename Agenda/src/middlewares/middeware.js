exports.middlewareGlobal = (req, res, next) => { 
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    next();
}
// module.exports = (req, res, next) => { 
    //     next();
    // }
    exports.outroMiddleware = (req, res, next) => { 
        console.log('Sou seu outro middleware');
        next();
    };

    exports.checkCsrfError = (err, req, res, next) => {
        if(err){
            return res.render('404');
        }
        next();
    };

    exports.csrfMiddleware = (req, res, next) => {
        res.locals.csrfToken = req.csrfToken();
        next();
    }