
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Where I hide ideas' });
};
exports.index2 = function(req, res){
  res.render('index2', { title: 'Express' });
};
exports.index3 = function(req, res){
    res.render('index3', {title: 'Express' });
}
exports.indexWeird = function(req, res){
    res.render('index-weird', {title: 'Express' });
}
exports.indexPaper = function(req, res){
    res.render('index-paper', {title: 'Express' });
}
