    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    exports.home = function(req, res){
        res.render('home.ejs'); // load the index.ejs file
    }

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    exports.login = function(req, res){
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    }

    /*app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });*/

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    exports.signup = function(req, res){
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    }

  /*app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // LOGOUT ==============================
    // =====================================
    exports.logout = function(req, res){
      req.logout();
      res.redirect('/home');
    }

    /*
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
//};
*/


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/home');
}