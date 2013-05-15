
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Where I hide ideas' });
};
exports.index2 = function(req, res){
  res.render('index2', { title: 'Express' });
};
