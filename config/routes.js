var express = require("express");

const router = express.Router();

let user = require("..//controller/user/index");
let order = require("..//controller/orders/index");

let routes = (app)=> {

    router.post("/user",user.adduser);
    router.post("/userlogin",user.userlogin);

    router.post("/createorder",order.createorder);
    router.post("/updateorder",order.updateorder);
    router.post("/cancelorder",order.cancelorder);
    router.get("/vieworders",order.vieworders);
    router.get("/getorderedproductcountbydate",order.getorderedproductcountbydate);
    router.get("/getpurchesedproductcountbycustomer",order.getpurchesedproductcountbycustomer);


    app.use("/api", router);
};


module.exports = routes