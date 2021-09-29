'use strict';
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    "firstname": String,
    "lastname": String,
    "email" : String,
    "password": String,
    "mobile": Number,
    "isActive": Boolean,
    "createdOn": String
  });

const model = mongoose.model('users', userSchema);


const saveuserdetails = async(data) => {
    try {
        const user = new model(data);
        const savedata = await user.save();
        return savedata;
    } catch(err) {
        return false
    }
};

const viewuserdetails = async(data) => {
    try {

        var users;

        if(data.username)
        {
            users = await model.aggregate([
                {$match:{"isActive":true}},
                {$match: { $or: [{ email: data.username }, { mobile: data.username }] }}

            ]);
        }
        else
        {
            users = await model.aggregate([
                {$match:{"isActive":true}},
                {$match: { $or: [{ email: data.email }, { mobile: data.mobile }] }}

            ]);

        }
        
         return users;
    } catch(err) {
        return false
    }
};

const LogInData = async(data)=>{
    try{
const logindata = await model.aggregate([
    {$match:{"isActive":true}},
    {$match:{ $or: [{ email:data.email } , { password:data.password }] }}
]);
return logindata
    }catch(err){
        return false
    }
}



module.exports = { 
    saveuserdetails,
    viewuserdetails,
    LogInData
 };