const orderModelCtrl = require('../model/orderModel');
const orderDoneModelCtrl = require('../model/orderDoneModel');


function saveOrder(req, res){
    let orderData = orderModelCtrl.orderModel({
        orderId : req.body.orderId,
        items : req.body.items
    });
    console.log(orderData);
    orderData.save((err, result)=>{
        if(err){
            res.send("While saving orders, Something went wrong!");
        }
        else
        {
            res.send("Ordered Successfully");
        }
    })
}


function fetchOrders(req, res){
    orderModel = orderModelCtrl.orderModel;
    orderModel.find({}, (err, docs)=>{
        if(err){
            res.send("While fetching orders, Something went wrong!");
        }
        else
        {
            res.send(docs);
        }
    });
}


function deleteOrder(req, res){
    try
    {
        //console.log("Request Body", req.body);
        if(req.params.orderId != null)
        {
    
            orderModelCtrl.orderModel.findOne({orderId : req.params.orderId},{_id : 0, __v : 0},(err, doc)=>{
                if(err)
                {
                    res.send("While fetching "+req.params.orderId+" , Something Went Wrong");
                }
                else
                {
                    console.log("Docs    " +doc);
                    var message = "";
                    orderDoneModelCtrl.orderDoneModel.insertMany(doc,(error, result)=>{
                        if(error)
                        {
                            message += "while inserting into ordersDone collection, Something went wrong";
                        }
                        else
                        {
                            message += "Successfully inserted into ordersDone collection";
                        }
                    });
                    orderModelCtrl.orderModel.deleteOne({orderId : req.params.orderId}, (err, result)=>{
                        if(err)
                        {
                            res.send(message+" and While deleteting a orderId from Orders")
                        }
                        else
                        {
                            res.send(message+" and Successfully deleted  "+JSON.stringify(result));
                        }
                    });
                    
                }
            })
        }
    }
    catch(e)
    {
        res.send("Something went wrong on deleteOrer funtion");
    }
}


function searchOrderId(req, res){
    try{
        if(req.params.orderId != null)
        {
            orderDoneModelCtrl.orderDoneModel.find({orderId : req.params.orderId},(err, doc)=>{
                if(err)
                {
                    res.send("While searching orderId in orderDone collection, Something went wrong");
                }
                else
                {
                    let isPresent = (doc.length == 0)? false : true ;
                    res.send(isPresent);   
                }
            });
        }
    }
    catch(e)
    {
        res.send("Something went wrong on searchOrderId funtion");
    }
}



module.exports = {saveOrder, fetchOrders, deleteOrder, searchOrderId};