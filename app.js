var config = require("nconf");
var express = require('express');
var http = require('http');
var net  = require('net');
var app = express();

var mongo = require('mongodb');
var monk = require('monk');
//var db = monk('localhost:27017/radio');
var db = monk('dimoniche:lbvsx@ds045664.mongolab.com:45664/devices');

config.argv()
    .env()
    .file({ file: 'config.json' });

// Make our db accessible to our router
 app.use(function(req,res,next){
     req.db = db;
     next();
 });

var UserDetails = db.get('user');

//boot
require('./boot/index')(app,UserDetails);

// routing
require('./routes/index')(app);

http.createServer(app).listen(app.get('port'), function () {
    if ('development' == app.get('env')) {
        console.log('Express server listening on port ' + app.get('port'));
    }
});

// var port_device = 3000;
// 
// // запустим ожидание 
// var server = net.createServer(function (stream) {
//     console.log('server connected');
// 
//     stream.on('data', function (data) {
// 
//         console.log(data);
// 
//         // разберем ответ
//         prepare_response(stream, data, port_device);
// 
//     });
// 
//     stream.on('close', function () {
//         console.log('server connection close');
//     });
//     stream.on('end', function () {
//         console.log('server disconnected');
//     });
//     stream.on('error', function () {
//         console.log('server error');
//     });
// });
// 
// server.listen(port_device, function() {
//     console.log('server bound');
// });
// 
// // запрос от прибора вида:
// //
// //	'deviceId'
// //  'device':
// //  'answer': {'id': "1",'name': "small device", 'state': 'on','lastTimeAccess': "12.01.2015"}
// //
// //
// // разбор пришедшего запроса от прибора
// function prepare_response(stream,data,port)
// {
//     // сначала разберем что приняли
//     var new_device = JSON.parse(data);
//     var collection = db.get('devices');
// 
//     // большое устройство - сфоррмируем объект
//     var newDevice = {
//         'deviceId': new_device.deviceId,
//         'device': new_device.device,
//         'description': "Концентратор",
//         'lastAccessTime': new Date(),
//         'answer': new_device.answer,
//     }
// 
//     collection.findOne({ 'deviceId': new_device.deviceId }).on('success', function (doc) {
//         
//         console.log('Устройство найдено');
// 
//         // нашли уже такой - обновим статусы
//         collection.findAndModify(
// 			{
// 				"query": { "deviceId": new_device.deviceId },
// 				"update": { "$set": { 
// 					"answer": new_device.answer,
// 					'lastAccessTime': new Date(),
// 				}},
// 				"options": { "new": true, "upsert": true }
// 			});
//             
//             console.log('Устройство обновлено');
//             return;
//     });
// 
//     // заносим в базу запись об новом устройстве
//     collection.insert(newDevice, function(err, result){
// 
//     });
// 
// }