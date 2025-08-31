const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 characters long'],
            
        }
    },
     RollNo:{
            type: String,
            required: true,
            unique: true,
            
        },
    Branch: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false //
    },
    AdminKey:{
        type:String
    }
});
adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ email: this.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
adminSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
module.exports = mongoose.model('Admin', adminSchema);