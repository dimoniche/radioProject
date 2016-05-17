var config = require("nconf");
var express = require('express');
var http = require('http');
var net  = require('net');
//var iconv = require("iconv");
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

 var port_device = 3000;
 
 // запустим ожидание
 
var s = http.createServer();
var error;

s.on('request', function(request, response) {
    response.writeHead(200);
    console.log(request.method);
    console.log(request.headers);
    console.log(request.url);
 
    var data = '';
    request.on('data', function(chunk) {
        //converter = new iconv.Iconv("UTF-8","windows-1251//IGNORE");
        //data = converter.convert(chunk).toString();
        
        data += chunk.toString('utf-8');
    });
    request.on('end', function() {
        console.log(data);
        
        try {
          prepare_response(data);   
        } catch (error) {
          console.log('Неверный запрос');
          response.writeHead(403);
        }

        response.write('hi');
        response.end();
    });
 
});
 
  s.listen(port_device, function() {
      console.log('server bound');
  }); 
 
 
 // запрос от прибора вида:
 //
 //	'deviceId'
 //  'device':
 //  'answer': {'id': "1",'name': "small device", 'state': 'on','lastTimeAccess': "12.01.2015"}
 //
 //
 // разбор пришедшего запроса от прибора
 function prepare_response(data)
 {
     // сначала разберем что приняли
     var new_device;
     error = 0;
     try
     {
         new_device = JSON.parse(data);
     }
     catch(e)
     {
         console.log('Неверный запрос');
         throw (e);
     }
     
     var collection = db.get('devices');
 
     var new_answer = new Array();
     new_answer = new_device.Answer;

     var i = 0;

     var answer = new Array();

     new_answer.forEach(function(element) {
         answer[i] = {'id': new_answer[i].id,'name': new_answer[i].name, 'state': new_answer[i].state, 'ch1':new_answer[i].ch1, 'ch2':new_answer[i].ch2, 'ch3':new_answer[i].ch3};
         i++;
     }, this);
     
     if(new_device.DeviceId == undefined 
     || new_device.Device == undefined)
     {
         throw(new Error('Bad request'));
     }

     // большое устройство - сформируем объект
     var newDevice = {
         'deviceId': new_device.DeviceId,
         'device': new_device.Device,
         'description': "БИП",
         'lastAccessTime': new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
         'ch1': new_device.ch1,
         'ch2': new_device.ch2,
         'ch3': new_device.ch3,
         'subnet': new_device.subnet,
         'answer': answer,
     }
            
      collection.findOne({ 'deviceId': newDevice.deviceId }).on('success', function (doc) {
          
          if(doc == undefined)
          {
                // заносим в базу запись об новом устройстве
                collection.insert(newDevice, function(err, result){
                    console.log('Устройство добавлено');
                });
          }
          else
          {
            console.log('Устройство найдено');
    
            // нашли уже такой - обновим статусы
            collection.findAndModify(
                {
                    "query": { "deviceId": newDevice.deviceId },
                    "update": { "$set": { 
                        "device": newDevice.device,
                        "answer": newDevice.answer,
                        'lastAccessTime': new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                    }},
                    "options": { "new": true, "upsert": true }
                });
                
                console.log('Устройство обновлено');
          }
      });
 }