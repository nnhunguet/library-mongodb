var Session = require('../../models/session.model');

module.exports.index = async function(req, res) {
    var sessions = await Session.find();
    res.json(sessions);
}