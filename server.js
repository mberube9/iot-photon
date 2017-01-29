var device_id = process.env['DEVICE_ID'],
    photon_var = process.env['PHOTON_VAR'],
    token = process.env['TOKEN'],
    api_url = process.env['API_URL'],
    polling_freq = process.env['POLLING_FREQ'];

var Particle = require('particle-api-js');
var particle = new Particle();
var request = require('request');


setInterval(function() {

   var json_get = {};
   var json_post = {};
   var date = new Date().toISOString();

   particle.getVariable({ deviceId: device_id, name: photon_var, auth: token }).then(function(data) {
     //console.log('Device variable retrieved successfully:', data);
     json_post.Time = date;
     json_post.Device_id = device_id;
     json_post.Photon_var = photon_var;
     json_post.Data = data.body.result;
     console.log(json_post);
     request.post(api_url).form(json_post);


   }, function(err) {
     console.log('An error occurred while getting attrs:', err);
   });


}, polling_freq);
