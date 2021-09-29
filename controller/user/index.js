'use strict';

const httpErrors = require('http-errors');
let users = require("./service");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const adduser = async (req, res) => {
    try {

        
        const checkExists = await users.viewuserdetails({email:req.body.email},{mobile:req.body.mobile})

        if(checkExists.length!=0){
            res.send({ status: 400, result: "Failure", message: 'User Already Exists!'}); 
            return false           
        }

        req.body.isActive = true;
        var date = new Date();

        req.body.createdOn=date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const saveuser = await users.saveuserdetails(req.body)
        if(saveuser){
            res.send({ status: 200, result: "Success", message: 'User Added Successfully!'});
        }
        else{
            res.send({ status: 400, result: "Failure", message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};


const userlogin = async (req, res) => {
    let logindata = await users.LogInData({email:req.body.email});
    //console.log(logindata,"index side");
    if(logindata.length>0){
      const validpassword = await bcrypt.compare(req.body.password, logindata[0].password);
      if(validpassword){
          res.send({status:200 , result:"success" , message:"Successfully Logined!"});
      }else{
          res.send({status:400 , result:"failure" , message:"invalid password!"});
      }
}else{
    res.send({status:400 , result:"not a user" ,  message:"No user found!"});
    }
}

module.exports = {
     adduser,
     userlogin

};