/*
 * GET home page.
 */


/*exports.index = function(req, res){
  res.render('test', { title: 'Home' });
};*/

exports.index = function(req, res){
	res.sendfile('views/profile.html');
};
