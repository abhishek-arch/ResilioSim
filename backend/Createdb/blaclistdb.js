const blacklistmodel = require('../db/Models/blacklist.model');
const blacklistToken = async (token) => {
    if (!token) {
        throw new Error('Token is required');
    }
     blacklist =await blacklistmodel.create({token})
     return blacklist;
}
module.exports = blacklistToken;