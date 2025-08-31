const userModel = require('../db/Models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const BlacklistTokenModel = require('../db/Models/blacklist.model.js');
const adminModel = require('../db/Models/admin.model.js');


module.exports.authenticateUser = async (req, res, next) => {

    const token = req.cookies.token|| req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
     const isBlacklisted = await BlacklistTokenModel.findOne({ token:token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });}
    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await userModel.findOne({email:decoded.email});
        
        if (!user) {
            return res.status(401).json({ message: 'decoded' });
        }
        req.user = user;
        return next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}



module.exports.authenticateAdmin = async (req, res, next) => {
   
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    // Check if token is present
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const isBlacklisted = await BlacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await adminModel.findOne({email:decoded.email});
        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.admin = admin;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}