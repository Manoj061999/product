'use strict';

const httpErrors = require('http-errors');
const order = require('./service');
var uuid = require('uuid');
const JWT = require('jsonwebtoken');


const createorder = async (req, res) => {
    try {

        req.body.orderid=uuid();
        req.body.totalprice=req.body.productprice*req.body.productquantity;
        req.body.status='PLACED'

        var date = new Date();
        req.body.createdOn=date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19);

        const saveorder = await order.saveorderdetails(req.body)
        if(saveorder){
            res.send({ status: 200, result: "Success", message: 'Order Placed Successfully!'});
        }
        else{
            res.send({ status: 400, result: "Failure", message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};



const updateorder = async (req, res) => {
    try {

        const getorder = await order.vieworderdetails({orderid:req.body.orderid})
        if(getorder.length!=0)
        {
            req.body.totalprice=getorder[0].productprice*req.body.productquantity;
            
            var date = new Date();
            req.body.createdOn=date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19);

            const updateorder = await order.updateorderdetails(req.body);
            if(updateorder)
            {
                res.send({ status: 200, result: "Success", message: 'Order Updated Successfully!'});
            }
            else
            {
                res.send({ status: 400, result: "Failure", message: 'Some Thing Went Wrong!'});
            }
        }
        else
        {
            res.send({ status: 400, result: "Failure", message: 'Order Not Found!'});
        }

    } catch(err) {
        res.send({ status: 400, msg: 'SOME THING WENT WRONG!'}); 
    }
};



const cancelorder = async (req, res) => {
    try {

        var date = new Date();
        req.body.createdOn=date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19);
        const cancelorder = await order.cancelorderdetails(req.body)
        if(cancelorder)
        {
            res.send({ status: 200, result: "Success", message: 'Order Cancelled Successfully!'});
        }
        else
        {
            res.send({ status: 400, result: "Failure", message: 'Some Thing Went Wrong!'});
        }
    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};



const vieworders = async (req, res) => {
    try {

        const vieworder = await order.vieworderdetails(req.query);
        if(vieworder.length!=0)
        {
            res.send({ status: 200, result: "Success", message: vieworder});
        }
        else
        {
            res.send({ status: 400, result: "Failure", message: 'Orders Not Found'});
        }
    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};


const getorderedproductcountbydate = async (req, res) => {
    try {

        const getdata = await order.vieworderedcountdetails({})

        if(getdata.length!=0)
        {
            res.send({ status: 200, result: "Success", message: getdata});
        }
        else
        {
            res.send({ status: 400, result: "Failure", message: 'Orders Not Found'});
        }
    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};



const getpurchesedproductcountbycustomer = async(req, res) => {
    try {

        const getdata = await order.viewpurchesedcountdetails({})

        if(getdata.length!=0)
        {
            res.send({ status: 200, result: "Success", message: getdata});
        }
        else
        {
            res.send({ status: 400, result: "Failure", message: 'Orders Not Found'});
        }
    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};



module.exports = {
    createorder,
    updateorder,
    cancelorder,
    vieworders,
    getorderedproductcountbydate,
    getpurchesedproductcountbycustomer
};

