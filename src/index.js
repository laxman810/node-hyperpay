
var hyperpay = require('./hyperpay');

var Joi = require('joi');

module.exports = [
    {
        method: 'DELETE',
        path: '/hyperpay/registration',
        config: {
            tags: ['api', 'master'],
            description: 'delete card',
            notes: 'delete card',
            auth: false,
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                },
            },
            validate: {
                payload:
                        {
                            id: Joi.string().required().description('registration id')
                        }
            }
        },
        handler: hyperpay.deleteRegistration
    },
    {
        method: 'POST',
        path: '/hyperpay/registration',
        config: {
            tags: ['api', 'slave'],
            description: 'new card registration',
            notes: 'new card registration',
            auth: false,
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload:
                        {
                            paymentBrand: Joi.string().required().description('paymentBrand VISA'),
                            cardNumber: Joi.string().required().description('cardNumber 4200000000000000'),
                            cardHolder: Joi.string().required().description('cardHolder Laxman Tukadiya'),
                            cardExpiryMonth: Joi.string().required().description('cardExpiryMonth 05'),
                            cardExpiryYear: Joi.string().required().description('cardExpiryYear 2018'),
                            cardCvv: Joi.string().required().description('cardCvv 123')
                        }
            }
        },
        handler: hyperpay.registration
    },
    {
        method: 'POST',
        path: '/hyperpay/checkout',
        config: {
            tags: ['api', 'slave'],
            description: 'checkout',
            notes: 'checkout',
            auth: false,
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload:
                        {
                            id: Joi.string().required().description('registrationsId'),
                            amount: Joi.string().required().description('amount'),
                            currency: Joi.string().required().description('currency'),
                            paymentType: Joi.string().required().description('paymentType - DB')
                        }
            }
        },
        handler: hyperpay.checkout
    },
    {
        method: 'POST',
        path: '/hyperpay/payment',
        config: {
            tags: ['api', 'slave'],
            description: 'payment',
            notes: 'payment',
            auth: false,
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload:
                        {
                            id: Joi.string().required().description('registrationsId'),
                            amount: Joi.string().required().description('amount'),
                            currency: Joi.string().required().description('currency'),
                            paymentType: Joi.string().required().description('paymentType - DB')
                        }
            }
        },
        handler: hyperpay.payment
    },
    {
        method: 'GET',
        path: '/hyperpay/status/{id}',
        config: {
            tags: ['api', 'slave'],
            description: 'status',
            notes: 'status',
            auth: false,
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                params:
                        {
                            id: Joi.string().required().description('registrationsId')
                        }
            }
        },
        handler: hyperpay.status
    },
    {
        method: 'GET',
        path: '/hyperpay/shopperResultUrl',
        config: {
            tags: ['api', 'slave'],
            description: 'status',
            notes: 'status',
            auth: false,
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
            }
        },
        handler: function (req, reply) {
            console.log('shopperResultUrl Called...');
            console.log(req.query);
            if (typeof req.query.id != "undefined" && req.query.resourcePath != "undefined")
            {
                reply.file(__dirname + '/success.html');
            } else {
                reply.file(__dirname + '/failure.html');
            }
        }
    },
    {
        method: 'POST',
        path: '/hyperpay/cardPayment',
        config: {
            tags: ['api', 'slave'],
            description: 'card payment',
            notes: 'card payment',
            auth: false,
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload:
                        {
                            amount: Joi.string().required().description('amount'),
                            currency: Joi.string().required().description('currency'),
                            paymentType: Joi.string().required().description('paymentType - DB'),
                            paymentBrand: Joi.string().required().description('paymentBrand - VISA'),
                            cardNumber: Joi.string().required().description('cardNumber - 4200000000000000'),
                            cardHolder: Joi.string().required().description('cardHolder - Laxman Tukadiya'),
                            cardExpiryMonth: Joi.string().required().description('cardExpiryMonth - 05'),
                            cardExpiryYear: Joi.string().required().description('cardExpiryYear - 2018'),
                            cardCvv: Joi.string().required().description('cardCvv - 123')
                        }
            }
        },
        handler: hyperpay.cardPayment
    }
]