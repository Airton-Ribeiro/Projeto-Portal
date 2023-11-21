exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
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
    if (err && err.code !== 'EBADCSRFTOKEN') {
        return next(err); // Erro CSRF não deve causar redirecionamento para a página de erro 404
    }
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}


exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Você precisa fazer login.');
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
}


