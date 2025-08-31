const userModel = require('../db/Models/user.model');

const createUser = async ({fullname,email,password,phone,emgcontact,address}) => {
    if(!email || !password || !emgcontact || !fullname || !phone || !address) {
        throw new Error('All fields are required');
    }
    const user = await userModel.create({
        fullname,
        email,
        password,
        phone,
        emgcontact,
        address,
       //
      
    });
    return user;
};
module.exports= createUser

 
