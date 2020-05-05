module.exports.index = async function(req, res) {

  var Blog = require('../models/blog.model');
  
  var page = parseInt(req.query.page) || 1;
  var blogs = await Blog.find();
  
  res.render('blog/index', {
    blogs: blogs.slice((page-1)*3, page*3),
    page: page
  });

}