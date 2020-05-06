var User = require('../../models/user.model');

module.exports.postLogin = async function(req, res) {
    var x = await req.body;
    res.json(x);
}

module.exports.index = async function(req, res) {
    var id = req.params.id;
    console.log(id);
    var users = await User.findOne({_id: id});
    res.json(users); 
}