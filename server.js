var Hapi = require('hapi');
var Server = new Hapi.Server();

Server.connection({
    port: 1234, host: '0.0.0.0', routes: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with','authorization']
        }
    }
});

/* +_+_+_+_+_+_+_+_+_+_+ Plugins / Middlewares +_+_+_+_+_+_+_+_+_+_+ */
Server.register(
    [
        require('inert'),
        require('vision'),
        {
            register: require('hapi-swagger'),
            options: {
                protocol: 'http',
                apiVersion: "0.0.1"
            }
        },//swagger plugin
        {
            register: require("good"),
            options: {
                reporters: {
                    myConsoleReporter:
                    [
                        { module: 'good-console' },
                        'stdout'
                    ]
                }
            }
        },//logging the api & response time
    ], function (err) {
        if (err) {
            Server.log(['error'], 'hapi-swagger load error: ' + err)
        }
        else {
            Server.log(['start'], 'hapi-swagger interface loaded')
        }
    });
/* +_+_+_+_+_+_+_+_+_+_+ End +_+_+_+_+_+_+_+_+_+_+ */


/* +_+_+_+_+_+_+_+_+_+_+_+_+_+_+ START SERVER +_+_+_+_+_+_+_+_+_+_+_+_+_+_+ */
Server.start(() => {
    console.log('Server running at:', Server.info.uri);
});

/* +_+_+_+_+_+_+_+_+_+_+_+_+_+_+ API ROUTES +_+_+_+_+_+_+_+_+_+_+_+_+_+_+ */

Server.route(require('./src'));//all the routes