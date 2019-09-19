var _ = require('underscore-node');
var http = require('https');
var querystring = require('querystring');

var config = require('./config.json');

//        'paymentBrand': 'VISA',
//        'card.number': '4200000000000000',
//        'card.holder': 'Laxman Tukadiya',
//        'card.expiryMonth': '05',
//        'card.expiryYear': '2018',
//        'card.cvv': '123'
module.exports.registration = function (request, reply) {
    var path = '/v1/registrations';
    var data = querystring.stringify({
        'authentication.userId': config.USERID,
        'authentication.password': config.PASSWORD,
        'authentication.entityId': config.ENTITYID_DB,
        'paymentBrand': request.payload.paymentBrand,
        'card.number': request.payload.cardNumber,
        'card.holder': request.payload.cardHolder,
        'card.expiryMonth': request.payload.cardExpiryMonth,
        'card.expiryYear': request.payload.cardExpiryYear,
        'card.cvv': request.payload.cardCvv
    });
    var options = {
        port: 443,
        host: config.PAYMENT_HOST,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        }
    };
    var postRequest = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            jsonRes = JSON.parse(chunk);
            if (jsonRes.result.code == "000.100.110")
            {
                return  reply({errNum: 200, errMsg: jsonRes.result.description, errFlag: 0, 'data': jsonRes});
            } else
                return  reply({errNum: 200, errMsg: jsonRes.result.description, errFlag: 1, 'data': jsonRes});
        });
    });
    postRequest.write(data);
    postRequest.end();
};

module.exports.cardPayment = function (request, reply) {
    var path = '/v1/payments';
    var data = querystring.stringify({
        'authentication.userId': config.USERID,
        'authentication.password': config.PASSWORD,
        'authentication.entityId': config.ENTITYID_DB,
        'amount': request.payload.amount,
        'currency': request.payload.currency,
        'paymentBrand': request.payload.paymentBrand,
        'paymentType': request.payload.paymentType,
        'card.number': request.payload.cardNumber,
        'card.holder': request.payload.cardHolder,
        'card.expiryMonth': request.payload.cardExpiryMonth,
        'card.expiryYear': request.payload.cardExpiryYear,
        'card.cvv': request.payload.cardCvv,
        'shopperResultUrl': 'http://localhost:1234/hyperpay/shopperResultUrl',
        'createRegistration': 'true'
    });
    var options = {
        port: 443,
        host: config.PAYMENT_HOST,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        }
    };
    var postRequest = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            jsonRes = JSON.parse(chunk);
            if (jsonRes.result.code == "000.100.110")
            {
                return  reply({errNum: 200, errMsg: jsonRes.result.description, errFlag: 0, 'data': jsonRes});
            } else
                return  reply({errNum: 200, errMsg: jsonRes.result.description, errFlag: 1, 'data': jsonRes});
        });
    });
    postRequest.write(data);
    postRequest.end();
};

module.exports.deleteRegistration = function (request, reply) {
    var path = '/v1/registrations/' + request.payload.id;
    path += '?authentication.userId=' + config.USERID
    path += '&authentication.password=' + config.PASSWORD
    path += '&authentication.entityId=' + config.ENTITYID_DB
    var options = {
        port: 443,
        host: config.PAYMENT_HOST,
        path: path,
        method: 'DELETE',
    };
    var postRequest = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            jsonRes = JSON.parse(chunk);
            if (jsonRes.result.code == "000.100.110")
            {
                return  reply({errNum: 200, errMsg: jsonRes.result.description, errFlag: 0, 'data': jsonRes});
            } else
                return  reply({errNum: 200, errMsg: jsonRes.result.description, errFlag: 1, 'data': jsonRes});
        });
    });
    postRequest.end();
};




module.exports.checkout = function (request, reply) {

    var path = '/v1/checkouts';
    var data = querystring.stringify({
        'authentication.userId': config.USERID,
        'authentication.password': config.PASSWORD,
        'authentication.entityId': config.ENTITYID_DB,
        'amount': request.payload.amount,
        'currency': request.payload.currency,
        'paymentType': request.payload.paymentType,
        'registrations[0].id': request.payload.id,
        'createRegistration': 'true'
    });
    var options = {
        port: 443,
        host: config.PAYMENT_HOST,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        }
    };
    var postRequest = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            jsonRes = JSON.parse(chunk);
            if (jsonRes.result.code == "000.200.100")
            {
                return  reply({errNum: 200, errMsg: jsonRes.result.description, errFlag: 0, 'data': jsonRes});
            } else
                return  reply({errNum: 200, errMsg: jsonRes.result.description, errFlag: 1, 'data': jsonRes});

        });
    });
    postRequest.write(data);
    postRequest.end();
};

module.exports.payment = function (request, reply) {

    var path = '/v1/registrations/' + request.payload.id + '/payments';
    var data = querystring.stringify({
        'authentication.userId': config.USERID,
        'authentication.password': config.PASSWORD,
        'authentication.entityId': config.ENTITYID_DB,
        'amount': request.payload.amount,
        'currency': request.payload.currency,
        'paymentType': request.payload.paymentType,
        'shopperResultUrl': 'http://localhost:1234/hyperpay/shopperResultUrl'
    });
    var options = {
        port: 443,
        host: config.PAYMENT_HOST,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        }
    };
    var postRequest = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            jsonRes = JSON.parse(chunk);
            if (jsonRes.result.code == "000.100.110")
            {
                return  reply({errNum: 200, errMsg: jsonRes.result.description, errFlag: 0, 'data': jsonRes});
            } else
                return  reply({errNum: 200, errMsg: jsonRes.result.description, errFlag: 1, 'data': jsonRes});
        });
    });
    postRequest.write(data);
    postRequest.end();
};



module.exports.status = function (request, reply) {

    var path = '/v1/checkouts/' + request.params.id + '/payment';
    path += '?authentication.userId=' + config.USERID
    path += '&authentication.password=' + config.PASSWORD
    path += '&authentication.entityId=' + config.ENTITYID_DB
    var options = {
        port: 443,
        host: config.PAYMENT_HOST,
        path: path,
        method: 'GET',
    };
    var postRequest = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            jsonRes = JSON.parse(chunk);
            if (jsonRes.result.code == "000.100.110")
            {
                return  reply({errNum: 200, errMsg: jsonRes.result.description, errFlag: 0, 'data': jsonRes});
            } else
                return  reply({errNum: 200, errMsg: jsonRes.result.description, errFlag: 1, 'data': jsonRes});

        });
    });
    postRequest.end();
};