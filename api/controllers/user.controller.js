module.exports.postLogin = async function(req, res) {
    var x = await req.body;
    res.json(x);
}