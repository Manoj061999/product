'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
    "orderid": String,
    "productname": String,
    "productquantity": Number,
    "productprice": Number,
    "totalprice":Number,
    "address":String,
    "paymentmethod":String,
    "status":String,
    "mobile":String,
    "email":String,
    "firstname":String,
    "lastname":String,
    "isActive":Boolean,
    "createdOn":String,
  });

const model = mongoose.model('orders', orderSchema);

const saveorderdetails = async(data) => {
    try {
        const order = new model(data);
        const saveorder = await order.save();
        return saveorder;
    } catch(err) {
        return false
    }
};


const updateorderdetails = async(data) => {
    try {
        console.log(data);
         const users = await model.updateMany(
            {"orderid" : data.orderid},
            {$set: {"productquantity":data.productquantity,
                    "totalprice":data.totalprice,
                    "address":data.address,
                    "isActive" : true,
                    "createdOn": data.createdOn}},
            {new : true}
        );
         return users;
    } catch(err) {
        return false
    }
};


const vieworderdetails = async(data) => {
    try {

        var order;
        var query=[];
        query.push({$match:{"status":"PLACED"}})
        if(data.orderid)
        {
            query.push({$match: { orderid: data.orderid }});
        }
        if(data.mobile)
        {
            query.push({$match: { mobile: data.mobile }});
        }
        if(data.searchdata)
        {
            query.push({$match: { $or: [{ productname: data.searchdata }, 
                                        { mobile: data.searchdata },
                                        { email: data.searchdata },
                                        { firstname: data.searchdata }
                                    ] }})
        }
        if(data.sortvalue)
        {
            query.push({ $sort : { createdOn: parseInt(data.sortvalue) } })
        }

        order = await model.aggregate([
                query
        ]);
     
         return order;
    } catch(err) {
        return false
    }
};


const  cancelorderdetails= async(data) => {
    try {
         const users = await model.updateMany(
            {"orderid" : data.orderid},
            {$set: {"status":"CANCELLED",
                    "createdOn": data.createdOn}},
            {new : true}
        );
         return users;
    } catch(err) {
        return false
    }
};


const vieworderedcountdetails = async() => {
    try {

        var orderproductcount;

        orderproductcount = await model.aggregate([
                {$match:{status:"PLACED"}},
                {
                    $group: {
                      _id: { date: { $substr: [ "$createdOn", 0, 10 ] },
                        productname: "$productname",
                        productquantity: "$productquantity" ,
                        productprice: "$productprice" ,
                        totalprice: "$totalprice"},
                        count: { $sum: 1 }
                    }
                }
            ]);

         return orderproductcount;
    } catch(err) {
        return false
    }
};

const viewpurchesedcountdetails = async() => {
    try {

        var customerproductcount;

        customerproductcount = await model.aggregate([
            {$match:{status:"COMPLETED"}},
            {
                $group: {
                  _id: { customername:{ $concat: [ "$firstname", " ", "$lastname" ] },
                        productprice:  "$productprice",
                        productquantity: "$productquantity",
                        totalprice: "$totalprice",
                        productname: "$productname" ,
                        status:"$status",
                        date: "$createdOn" },
                 count: { $sum: 1 }
                }
            }
            ]);

         return customerproductcount;
    } catch(err) {
        return false
    }
};






module.exports = { 
    saveorderdetails,
    updateorderdetails,
    vieworderdetails,
    cancelorderdetails,
    vieworderedcountdetails,
    viewpurchesedcountdetails
};
