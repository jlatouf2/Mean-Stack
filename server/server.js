//var io = require('socket.io')(server);
//THIS WORKS B/C I COPIED IT FROM fenixapps.com

var express = require('express');
//var app2 = express();
var debug = require('debug')('passport-mongo'),
    app = require('./app');
var http = require('http');
var port = 3000;
var httpServer = http.Server(app);
 httpServer.listen(port, function(){
   // console.log("server listening on port", port);
    console.log('Express server listening on port ' + httpServer.address().port);

});
 
 
var io = require('socket.io').listen(httpServer);


app.set('port', process.env.PORT || 3000);


io.sockets.on('connection', function (socket) {
    
					   socket['mySessionVar'] = 'myValue';
					console.log( "I have a super variable save in the session: " + socket['mySessionVar']);
					

    
		    var _socket = socket;
		    
		  socket.on('echo', function (data) {
			      //  _socket.emit('echo', data);
			        console.log('Data Sent');
					io.emit('echo', data);
					
			/*
			    	socket['mySessionVar'] = data;
					console.log( "I have a super variable save in the session: " + socket['mySessionVar']);
			
			
					socket.username = "USERNAME";
					console.log( "I have a super variable save in the session: " + socket.username);
			*/
			    
		    });
		 
		socket.on('echo-ack', function (data, callback) {
				        callback(data);
				     //   io.emit('acho-ack', data);
				       
				        
				        
				    });
		    
	    socket.on('dataStuff', function (data, callback) {
				       callback(data);
						        
						console.log( "I have a super variable save in the session: " + socket.username);
						    	io.emit('new message', socket.username);
				
		    });
		    
		    
		    
	   socket.on('send message', function(data){
	   	
				    	io.emit('new message', data);
		    });
		    
	   socket.on('sendstuff', function(data){
	   				console.log('TED');
				    	//io.emit('new message', data);
		    });

		
		
	   socket.on('echoinformation', function (data) {
				        console.log('Data Sent');
						
							 Post.find()
							  .exec(function(err, posts) {
						    if (err) { return next(err) }
						console.log(posts);
						      var black = JSON.stringify(posts);
						
							io.emit('echo', black);
						
						  })
						
						
						
						    });
//Second
	   socket.on('echoinformation2', function (data) {
		        console.log('Data Sent');
				
					 Post.find()
					  .exec(function(err, posts) {
				    if (err) { return next(err) }
				console.log(posts);
				      var black = JSON.stringify(posts);
				
					io.emit('echo2', black);
				
				  })
				
				
				
				    });
				    /*
TO GET THE VARIABLES IN JAVASCRIPT YOU NEED TO USER WHATEVER YOU CALLED THEN IN THE CONTROLLER:
//EX   $socket.emit('echoinformation3', {latitude : $scope.lats, longitude : $scope.longs, distance : $scope.dists});
		           in this its data.latitude and data.longitude and data.distance
*/
//Third WORKS

	   socket.on('echoinformation3', function (data) {
		        console.log(data.latitude);
				 console.log(data.longitude);
				  console.log(data.distance);

				 console.log(data);

			  var track = new Track({
				latitude: data.latitude,
				longitude: data.longitude,
				distance: data.distance,
				
				})
			  track.save(function (err, post) {
			    if (err) { return next(err) }
			//    res.json(201, post)
			console.log('worked')
			io.emit('echo3', data);

			  })

		});

						    
						/*
						 * 
						 	   socket.on('echoinformation3', function (data) {
							        console.log('Data Sent');
									
					        var newMsg = new Post({username: 'data.username', body: 'data.body'});
					        newMsg.save(function(err){
					        	if(err) throw err;
											console.log("posts worek");
																//io.emit('echo3', black);
					        });
															io.emit('echo3');
					
									});
					
					
						   socket.on('echoinformation3', function (data) {
							        console.log(data.data);
									 console.log(data.data1);
									 console.log(data);
					
								  var track = new Track({
									latitude: data.data,
									longitude: data.data1,
					
									
									})
								  track.save(function (err, post) {
								    if (err) { return next(err) }
								//    res.json(201, post)
								console.log('worked')
								io.emit('echo3', data);
					
								  })
					
							});
					
						 
						 */					    
						    
						    
	  socket.on('postedinfo', function(data){

				        console.log('Data Sent' + data.username );
						
        var newMsg = new Post({username: data.username, body: data.body});
        newMsg.save(function(err){
        	if(err) throw err;
						console.log("posts wored");
        });

		    });
				    
				    
	  socket.on('postedinfo2', function(data, req){

				        console.log('Data Sent' );
						
			  var track = new Track({
			  username: req.body.username,
			  latitude: req.body.latitude,
			  longitude: req.body.longitude,
			  distance: req.body.distance,
			//  email: req.body.email,
			
			  })
			  track.save(function (err, post) {
			    if (err) { return next(err) }
			    res.json(201, post)
			console.log('worked')
			io.emit('emit', "STUFFING");

			  })

		    });

				   		

});
