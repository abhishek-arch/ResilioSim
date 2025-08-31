const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    
        fullname: {
            type: String,
            required: true, 
            minlenth:[3,'first name must be at least 3 characters long']},
       
       
        
    email: {
        type: String,
        required: true,
        unique: true,
       
    },
    password: {
        type: String,
        required: true,
            minlength: [6, 'Password must be at least 6 characters long'],
            Select: false 
        },
        phone: {
            type: String,
            required: true,
            minlength: [10, 'Phone number must be at least 10 digits long'],
        },
        emgcontact: {
            type: String,
            required: true,
            minlength: [10, 'Emergency contact number must be at least 10 digits long'],
        },
        address: {
            type: String,
            required: true,
           
        }
    })

    userSchema.methods.generateAuthToken = function() {
        const token = jwt.sign({ email: this.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
        return token;
    }
    userSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    }
    userSchema.statics.hashPassword = async function (password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }




    module.exports = mongoose.model('User', userSchema);