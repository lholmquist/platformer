#!/bin/env node

var debug = require('debug')('my-application');
var app = require('./app');

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('ipaddress', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

var server = app.listen(app.get('port'), app.get('ipaddress'), function() {
  debug('Express server listening on port ' + server.address().port);
});

process.on('exit', function() { terminator(); });
    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
     'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
    ].forEach(function(element, index, array) {
        process.on(element, function() { terminator(element); });
});

function terminator(sig){
    if (typeof sig === "string") {
        console.log('%s: Received %s - terminating sample app ...', Date(Date.now()), sig);
        process.exit(1);
    }
    console.log('%s: Node server stopped.', Date(Date.now()) );
};
