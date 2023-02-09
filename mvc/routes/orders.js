const express = require('express');
const routes = express.Router();

const orderDetails = require('../controller/orders');

routes.post('/saveOrder', orderDetails.saveOrder);
routes.get('/fetchOrders',orderDetails.fetchOrders);
routes.delete('/deleteOrder/:orderId',orderDetails.deleteOrder);
routes.get('/searchOrderId/:orderId',orderDetails.searchOrderId);

module.exports = routes;