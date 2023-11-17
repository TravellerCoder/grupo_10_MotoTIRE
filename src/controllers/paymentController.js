const path = require('path');
const fs = require('fs');

//const client = new MercadoPagoConfig({ accessToken: 'TEST-1348422654696368-110811-81e1ae5c60bf1ea4d100975476dbf7d3-1541567810', options: { timeout: 5000, idempotencyKey: 'abc' } });

const paymentController = {
    
    renderCreateOrder: (req,res) => {

       

        return res.render(path.resolve('src/views/products/productCart'));
    }
}

module.exports = paymentController;