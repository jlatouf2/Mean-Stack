angular.module('myApp').controller('loginController', ['$scope', '$location', 'AuthService',  

function($scope, $location, AuthService, data) {
		
				
							//LOGIN
							$scope.login = function() {
						
								// initial values
								$scope.error = false;
								$scope.disabled = true;
						
								// call login from service
								AuthService.login($scope.loginForm.username, $scope.loginForm.password)
								// handle success
								.then(function() {
									$location.path('/');
						
									$scope.disabled = false;
									$scope.loginForm = {};
								})
								// handle error
								.catch(function() {
									$scope.error = true;
									$scope.errorMessage = "Invalid username and/or password";
									$scope.disabled = false;
									$scope.loginForm = {};
								});
						
							};
							
							//JUST COMPLETE WHAT YOU HAVE
							
							/*
							 * 1. change facebook button to use ng-click: authservice.conform (from services.js), then
							 * 2.In confirm() {} use http(user/facebook) to allow facebook to login, then
							 * 3. on success call storeinfo() in services.js to store variables...
							 */
							$scope.confirm = function() {
															// initial values
								$scope.error = false;
								$scope.disabled = true;

															// call login from service
								AuthService.confirm()
								// handle success
								.success(function() {
									console.log(' Success');
									
								}).error(function() {
									console.log(' failure');
								});
	
				
				}
				}]);

angular.module('myApp').controller('logoutController', ['$scope', '$location', 'AuthService', '$http',  '$rootScope',
function($scope, $location, AuthService, $http, $rootScope) {

							$scope.logout = function() {
						
								console.log(AuthService.getUserStatus());
				
				//Delete Store Variables:
			                $rootScope.useremail = '';
			                $rootScope.name = '';
			                $rootScope.id = '';
			                $rootScope.token = '';
			
								// call logout from service
								AuthService.logout().then(function() {
									                $rootScope.userdata = null;
									$location.path('/login');
								});
						
							};
						
							$scope.facebooklogout = function() {
			
								$http.get('/logout333', {
							
								}).success(function() {
									console.log('Logout Success');
									
								}).error(function() {
									console.log('Logout failure');
								});
			
							};
			
			}]);
			
	



angular.module('myApp').controller('registerController', ['$scope', '$location', 'AuthService', '$rootScope',
function($scope, $location, AuthService, $rootScope) {
	
			
						$scope.register = function() {
					
							// initial values
							$scope.error = false;
							$scope.disabled = true;
					
							// call register from service
							AuthService.register($scope.registerForm.username, $scope.registerForm.password)
							// handle success
							.then(function() {
								$location.path('/login');
								$scope.disabled = false;
								$scope.registerForm = {};
							})
							// handle error
							.catch(function() {
								$scope.error = true;
								$scope.errorMessage = "Something went wrong!";
								$scope.disabled = false;
								$scope.registerForm = {};
							});
					
						};
			
			}]); 




angular.module('myApp').controller('NameListController',  ['$scope', '$socket', '$http', '$rootScope',
function ($scope, $socket, $http, $rootScope, data) {


				console.log('FJLSDKJFLSDKFJDL' + $scope.useremail);


		         	/*
		         	 * THIS IS PART OF ROOTSCOPE TO PASS VARIABLE:
		         	 */
		         	
		         	  console.log($scope.items); 
		         	  console.log($scope.iblack); 
		
		
		  				// ANGULAR TO NODE TO MONGO AND BACK
		 				//THIS IS HOW YOU WORK WITH THE ANGULARJS TO NODE TO MONGO AND BACK 
						//DATA IS ONLY parsed
		
				$scope.diffPost = function() {
		
				$http.get('/user/posts2').success(function( data) {$scope.contacts = data}, function(posts) {});
		
			};
		
						//THIS IS WHERE INPUT IS SENT TO DATABASE
						
						$scope.postedUsername = function() {
							
								console.log('button pressed');
		
							$http.post('/user/posted', {
								username : $scope.SendUserData,
								body : $scope.SendUserData4,
							}).success(function() {
								console.log('Post success');
		
							}).error(function() {
								console.log('Post failure');
							});
							$scope.SendUserData = '';
		
						};
						
		            $scope.postedUsername2 = function postedUsername2() {
		                console.log('postedUsername2 sent');
		             //   $socket.emit('postedinfo', $scope.SendUserData2);
		
		                $socket.emit('postedinfo', { username : $scope.SendUserData2, body: $scope.SendUserData3});
		
		            };
		
		
						/*
						THIS IS WHERE DATA IS SENT TO WEBSOCKET TO MONGO
						  I HAD TO PARSE THE DATA
						 	AND STRINIFY IT....!!!!!!!!!!!!!!!!!!!!!!
						 */
		
		
		            $scope.emitBasic7 = function emitBasic7() {
		                console.log('emitBasic7 sent');
		                $socket.emit('echoinformation', "WHITE");
		            };
		
		
					$socket.on('echobackinfo', function (data) {
		                        console.log(data);
		                        var dog = JSON.parse(data);
		                        console.log(dog);
					var doggy = [
					        {
					            name: 'John Doe',
					            phone: '01234567890',
					            email: 'john@example.com'
					        },
					        {
					            name: 'Karan Bromwich',
					            phone: '09876543210',
					            email: 'karan@email.com'
					        }
					    ];
					
					$scope.contacts = dog
					            });
					
		
				    $http.get("http://www.w3schools.com/angular/customers.php")
				    .success(function (response) {$scope.names = response.records;});
				
				            
		            $socket.on('echo', function (data) {
		                $scope.serverResponse = data;
		                        console.log('Socket ON');
		
		            });
		            
		            $scope.emitBasic = function emitBasic() {
		                console.log('emitBasic sent');
		                $socket.emit('echo', $scope.dataToSend);
		                $scope.dataToSend = '';
		            };
		         
		            $scope.emitACK = function emitACK() {
		            					console.log('emitACK');
		                $socket.emit('echo-ack', $scope.dataToSend, function (data) {
						console.log('emitACK');
		                    $scope.serverResponseACK = data;
		
		                });
		                $scope.dataToSend = '';
		            };
		            
		              $scope.dataStuff = function dataStuff() {
		                $socket.emit('dataStuff', $scope.dataToSend, function (data) {
						console.log('dataStuff');
		                    $scope.serverResponsedataStuff = data;
		                    
		                });
		                $scope.dataToSend = '';
		            };
		        }]);
		




angular.module('myApp').controller('showuserController',  ['$scope', '$socket', '$http', '$rootScope', '$location',
function ($scope, $socket, $http, $rootScope, $location) {
         	
         	
         	
				$http.get('/user/postinfo').success(function( data) {$scope.contacts = data}, function(posts) {});
		
					    $scope.delete = function(index){
			       // contacts.destroy(index);
			    };
			
		
		
		
        }]);

angular.module('myApp').controller('contactController',  ['$scope', '$socket', '$http', '$rootScope', 'People',
function ($scope, $socket, $http, $rootScope, People) {
				         			    	$scope.people = People; 
  				         			console.log('THIS WORKS: ' + People);
  				         			console.log('THIS WORKS: ' + $scope.people[0].name);

					/*
					 *
					 * USE THESE WHICH WILL SELECT THE CONTACT AND IT WILL GO TO THE PAGE WITH THAT INFO
					 * -i think that will 
					 
					     .when('/contact/:id', {
				        controller: 'contactCtrl',
				        templateUrl: '/assets/partials/contact.html'
				    }) 
				    
					 	     .when('/contact/:name', {
				        controller: 'contactCtrl',
				        templateUrl: '/assets/partials/contact.html'
				    }) 
				
				
					 * .controller('contactCtrl', function($scope, $routeParams, contacts){
				    $scope.contact = contacts.find($routeParams.id);
											})
				routeParams.id = /contact/1/
				routeParams.id = /contact/John/
				
				
					 * .controller('contactCtrl', function($scope, $routeParams, contacts){
				    $scope.contact = contacts.find($routeParams.name);
											})
				
									<a href="/#/contacts/{{$index}}" class="btn btn-default btn-xs">View</a>
									<button class="btn btn-danger btn-xs" ng-click="delete($index)">Delete</button>
					 */
	
                               // console.log('WHITE' + $scope.data);

		         	  var contacts = [
						        {
						            name: 'Stephen Radford',
						            phone: '0123456789',
						            address: '123, Some Street\nLeicester\nLE1 2AB',
						            email: 'steve228uk@gmail.com',
						            website: 'stephenradford.me',
						            notes: ''
						        },
		        			        {
					            name: 'Karan Bromwich',
					            phone: '09876543210',
					            email: 'karan@email.com'
										        }
							
							    ];
							    
							      $scope.message = "In shape controller";
							      $scope.type = "Shape";
							$scope.type2 = $scope.useremail;
							$scope.type3 = $scope.name;
							$scope.type4 = $scope.id;
							$scope.type5 = $scope.token;
		
							    //THIS WILL ADD THE CONTACTS LIST TO THE TABLE
									$scope.contacts = contacts
						
						      $scope.users = ['bob', 'sean', 'rocky', 'john']
						    console.log ($scope.users)
		
				         	/*
				         	 * THIS IS PART OF ROOTSCOPE TO PASS VARIABLE:
				         	 * 			      $rootScope.items = 'YELLOW';
								So to add all data with rootscope probably use:
										      $rootScope.items = data;
				         	 */
				         	
				         	
				         					//console.log('FJLSDKJFLSDKFJDL' + $scope.useremail);
				//$scope.useremail = $scope.firstname;
						         				//	console.log('faffffffff' + $scope.firstname);
		
		               // $rootScope.useremail = data.username;
		
				
						    //THIS WILL ADD THE CONTACTS LIST TO THE TABLE
								//	$scope.blacks = $scope.useremail
						
		
					      $rootScope.items = 'YELLOW';

        }]);


angular.module('myApp').controller('contactsController',  ['$scope', '$http', '$rootScope', '$routeParams', 'People',
function ($scope, $http, $rootScope, $routeParams, People) {
	
			         			    	$scope.people = People; 
  				         			console.log('THIS WORKS: ' + $scope.people[0].name);
  				         			console.log('route info: ' + $scope.people[$routeParams.id].name);
  				         			
									$scope.person = $scope.people[$routeParams.id];
				  			 // $scope.person = People.find($routeParams.id);
				console.log ('blah' + $routeParams.id);
						console.log ('blah' + $scope.person);
					/*
					 *
					 * USE THESE WHICH WILL SELECT THE CONTACT AND IT WILL GO TO THE PAGE WITH THAT INFO
					 * -i think that will 
					 
					     .when('/contact/:id', {
				        controller: 'contactCtrl',
				        templateUrl: '/assets/partials/contact.html'
				    }) 
				    
					 	     .when('/contact/:name', {
				        controller: 'contactCtrl',
				        templateUrl: '/assets/partials/contact.html'
				    }) 
				
				
					 * .controller('contactCtrl', function($scope, $routeParams, contacts){
				    $scope.contact = contacts.find($routeParams.id);
											})
				routeParams.id = /contact/1/
				routeParams.id = /contact/John/
				
				
					 * .controller('contactCtrl', function($scope, $routeParams, contacts){
				    $scope.contact = contacts.find($routeParams.name);
											})
				
									<a href="/contact/{{$index}}" class="btn btn-default btn-xs">View</a>
									<button class="btn btn-danger btn-xs" ng-click="delete($index)">Delete</button>
					 */
	
                               // console.log('WHITE' + $scope.data);

         	  var contacts = [
				        {
				            name: 'Stephen Radford',
				            phone: '0123456789',
				            address: '123, Some Street\nLeicester\nLE1 2AB',
				            email: 'steve228uk@gmail.com',
				            website: 'stephenradford.me',
				            notes: ''
				        },
        			        {
			            name: 'Karan Bromwich',
			            phone: '09876543210',
			            email: 'karan@email.com'
								        }
					
					    ];
					    
					      $scope.message = "In shape controller";
					      $scope.type = "Shape";
					$scope.type2 = $scope.useremail;
					$scope.type3 = $scope.name;
					$scope.type4 = $scope.id;
					$scope.type5 = $scope.token;

					    //THIS WILL ADD THE CONTACTS LIST TO THE TABLE
							$scope.contacts = contacts
				
				      $scope.users = ['bob', 'sean', 'rocky', 'john']
				    console.log ($scope.users)

				

			      $rootScope.items = 'YELLOW';

        }]);


angular.module('myApp').controller('addController',  ['$scope', '$socket', '$http', '$rootScope',
function ($scope, $socket, $http, $rootScope) {
         	

							$scope.diffPost = function() {
					
							$http.get('/user/posts2').success(function( data) {$scope.contacts = data}, function(posts) {});
					
						};
			
							    $scope.submit = function(){
							      //  contacts.set($scope.contact);
			      					$http.post('/user/postinfo', {
								    name: $scope.contact.name,
									  email: $scope.contact.email,
									  phone: $scope.contact.phone,
									  website: $scope.contact.website,
							  	  address: $scope.contact.address,
									  notes: $scope.contact.notes,
			
								}).success(function() {
									console.log('Post success');
			
								}).error(function() {
									console.log('Post failure');
								});
								$scope.SendUserData = '';
			
							        $scope.contact = null;
							        $scope.added = true;
							    };
			


        }]);
        

				        
angular.module('myApp').controller('storenamesController',  ['$scope',  '$http',   '$rootScope', '$route',
function ($scope, $http, $rootScope, $interval, $route) {
							postal123 =null;
							$scope.store = "Walmart";
						//	$scope.postalcodetoAdd = "postal123";

					
						  // wire up button click
					$(document).ready(function () {
						  // wire up button click
						 // $('#go').click(function () {
						    // test for presence of geolocation
						    if(navigator && navigator.geolocation) {
						      // make the request for the user's position
						      navigator.geolocation.getCurrentPosition(geo_success, geo_error);
						    } else {
						      // use MaxMind IP to location API fallback
						      printAddress(geoip_latitude(), geoip_longitude(), true);
						    }
					 //     });
					 });
		
		
						 /*
//THIS IS THE CODE TO PROGRAM THE BUTTON
						 			$(document).ready(function () {
						  // wire up button click
						  $('#go').click(function () {
						    // test for presence of geolocation
						    if(navigator && navigator.geolocation) {
						      // make the request for the user's position
						      navigator.geolocation.getCurrentPosition(geo_success, geo_error);
						    } else {
						      // use MaxMind IP to location API fallback
						      printAddress(geoip_latitude(), geoip_longitude(), true);
						    }
						  });
						});
						*/
						 
						 
	function geo_success(position) {
				  printAddress(position.coords.latitude, position.coords.longitude);
				}
				 
	function geo_error(err) {
				  // instead of displaying an error, fall back to MaxMind IP to location library
				  printAddress(geoip_latitude(), geoip_longitude(), true);
				}
						 
						// use Google Maps API to reverse geocode our location
	function printAddress(latitude, longitude, isMaxMind) {
				    // set up the Geocoder object
						    var geocoder = new google.maps.Geocoder();
						 
				    // turn coordinates into an object
				    var yourLocation = new google.maps.LatLng(latitude, longitude);
				 
				    // find out info about our location
				    geocoder.geocode({ 'latLng': yourLocation }, function (results, status) {
				    if(status == google.maps.GeocoderStatus.OK) {
				      if(results[0]) {
				        $('#results').fadeOut(function() {
				          $(this).html('<p><b>Abracadabra!</b> My guess is:</p><p><em>' + results[0].formatted_address  +  '</em></p>').fadeIn();
				         
				                     var searchAddressComponents = results[0].address_components,
				    searchPostalCode="";

					$.each(searchAddressComponents, function(){
					    if(this.types[0]=="postal_code"){
					        searchPostalCode=this.short_name;
					        console.log(searchPostalCode);
					        $rootScope.postal123 = searchPostalCode;
					            //   console.log("Postal code" + searchPostalCode);
					    //  $scope.postalcodetoAdd = postal123;

					var newpostalcode = searchPostalCode.substr(0, searchPostalCode.length-4);
					console.log('newpostal' + newpostalcode);
					$rootScope.postal2 = newpostalcode;
					
					    }
					});
					
			$http.post('/user/postinfo25', { "postal": $scope.postal2 }).success(function( data) {$scope.contacts = data;
								console.log (data);
								}, function(posts) {});
					
					          console.log('formatted_address' + results[0].formatted_address);
					        })
					      } else {
					        error('Google did not return any results.');
					      }
					    } else {
					      error("Reverse Geocoding failed due to: " + status);
					    }
					  });
					  
					  
					  
					 /*
					  *           var searchAddressComponents = results[0].address_components,
					    searchPostalCode="";
					
					$.each(searchAddressComponents, function(){
					    if(this.types[0]=="postal_code"){
					        searchPostalCode=this.short_name;
					    }
					});
					   
					  
					     if(results[i].address_components[j].types[k] == "postal_code"){
					                    var zipcode = results[i].address_components[j].short_name;
					                    console.log('ZIPCODE' + zipcode)
					                              alert("No results found" + zipcode);
					
					                }
					
					  */
					 
					 
							  // if we used MaxMind for location, add attribution link
							  if(isMaxMind) {
							    $('body').append('<p><a href="http://www.maxmind.com" target="_blank">IP to Location Service Provided by MaxMind</a></p>');
							  }
							}
								 
					function error(msg) {
					  alert(msg);
					}
								
//Posts Store name to SEARCH for in table			
				   $scope.changeStatus30 = function(){
						console.log("clicked");
				
						$http.post('/user/postinfo30', 
						{ "store": $scope.store })
							.success(function( data) {
							$scope.contacts = data;
							console.log (data);
						}, function(posts) {});
			
					}
			
//Grabs Storename to pass to next page			
				$scope.grabStuff = function(contact){
							console.log("Name of Store " + contact);
							
						$rootScope.grabStorename = contact;
						console.log ("Name of Store variable: " + $scope.grabStorename);
						//THEREFORE USE $scope.grabLineIn to pass the vaariable to the next page:
					}
			
//Posts New Store Name....BUT does not post address


				      $scope.submitName = function(){
						$http.post('/user/postStore', 
							{"store": $scope.storetoAdd }).
							success(function() {
							console.log('Post success');
							console.log($scope.storetoAdd)
							
					console.log('success')
								}).error(function() {
									console.log('Post failure');
								});
						    };

					     //   $rootScope.postal123 = searchPostalCode;

		 $scope.submitInformation = function(){
						$http.post('/user/storePostalcode', 
							{"store": $scope.storetoAdd, "postal": $scope.postal123}).
							success(function() {
							console.log('Post success');
							console.log($scope.storetoAdd)
							
					console.log('success')
								}).error(function() {
									console.log('Post failure');
								});
						    };

	        }]);
 
angular.module('myApp').controller('storelinesController',  ['$scope',  '$http',   '$rootScope', 
function ($scope, $http, $rootScope) {

							
							console.log("Store name: " + $scope.grabStorename)

//Gets the names of lines in specific store	
//To get the storeName of specific one chosen in Storenames.html: 			
//	$http.post('/user/storeName', { }).success(function( data)
	
				$http.post('/user/storeName', { }).success(function( data)
						 {$scope.contacts = data;
							console.log (data);
							//console.log (data[1]);
							//console.log(data[0].linein);
							console.log(data.length );
							
							/*
							 * cant just add a new row to table, i must search database for number of lines, then add the line
							 in the database then update the page data so that the new line will form......
							 //Get LineNumber with http function below
							 2)add http function on to that .success to add the linenumber to the database and refresh table:
							 http.post('user/addline', {'addline':$scope.numberofRows}).success(function(data){};
							 */
							
							$rootScope.numberofRows = data.length;
							
							console.log('Add Line Number:'+(data.length+1))
							}, function(posts) {});
							
							
			
//Calculates number of lines in table:
			
				$scope.numberRows = function(){
				//	console.log("Number of Rows " + $scope.numberofRows);
					$http.post('/user/lineNumber', { }).success(function( data)
						 {
						 	//$scope.contacts = data;
							console.log('THIS SHOWS THE NUMBER OF LINES ' +data );
								var b = parseInt("data")
								console.log (b);

							}, function(posts) {});
						}
						
						
					$rootScope.exampleLine = "Walmart";
					
					
		//	This is copy of above that needs to be fixed so that it 1)Counts rows
		 //		2) On success makes adds a http function that adds another line to Storelines
		 	
				$scope.numberStuff = function(){
				//	console.log("Number of Rows " + $scope.numberofRows);
					$http.post('/user/lineNumber', {"store" : $scope.exampleLine }).success(function( data)
						 {
						 	//$scope.contacts = data;
							console.log('THIS SHOWS THE NUMBER OF LINES ' +data );
							
							$rootScope.lineNum = data;
							console.log('DATA LENGTH' + (data.length+1))
							addLineFunction();
							
							
							}, function(posts) {});
						}
			
				
					function addLineFunction() {
					$http.post('/user/addLine', {"store" : $scope.exampleLine, "linein" : $scope.numberofRows  }).success(function(data)
						 {
						 	
						 	$scope.contacts = data;
							console.log('THIS SHOWS THE NUMBER OF LINES ' +data );
							console.log(data)
							myData22()
							}, function(posts) {});

					}

			
					function myData22(){
							$http.post('/user/storeName', { }).success(function( data)
						 {$scope.contacts = data;
							}, function(posts) {});
}
			
			
			
			
			
			
						var $index;
						var contact;
						
						
						var fruits = ["Banana", "Orange", "Apple", "Mango"];
						console.log(fruits.length);
			
						
				$scope.grabStuff = function(contact){
							console.log("LineIn " + contact);
							
						$rootScope.grabLineIn = contact;
						console.log ("LineIn Saved in variable: " + $scope.grabLineIn);
					}


	  }]);
	  
angular.module('myApp').controller('peopleinlineController',  ['$scope',  '$http',   '$rootScope', '$location', '$route',
function ($scope, $http, $rootScope, $location, $route) {
	
					console.log ("LineIn NEEDS TO BE SEARCHED: " + $scope.grabLineIn);

console.log ('Name' +$scope.name)
console.log('Email' +$scope.useremail);

//Searches Storeline db for Walmart Store and finds people in line		
					/*
						$http.post('/user/peopleLine', { }).success(function( data)
						 {$scope.contacts = data;
							console.log (data);
							}, function(posts) {});
			*/
	
//Searchs through Information db for people
							$http.get('/user/postinfo').success(function( data) {$scope.userstuff = data}, function(posts) {});
			
//Button that goes to the Storelines Page	
					$scope.otherPage = function(){
						$location.path('/storelines');
						console.log ("Moved page ");
					}

//Delete the specifc line in the table that the button is in:			
					    $scope.deleted = function(contact){
					    	console.log('Name in Line' + contact);
					    	$rootScope.nameDelete = contact;
						console.log ('Name' + $scope.nameDelete)
						
						
					       	$http.post('/user/deleteName', {"name": $scope.nameDelete}).success(function( ) {
					       		  console.log("deleted");
					       		  $route.reload();
						       		  
						  }, function(posts) {});
						
						    };
			
//Person name is grabbed:			
				 	$scope.grabName = function(contact){
								console.log("Name " + contact);
								
							$rootScope.grabPeopleName = contact;
							console.log ("LineName  in variable: " + $scope.grabPeopleName);
							//THEREFORE USE $scope.grabLineIn to pass the vaariable to the next page:
						}
			
//		This is NOT in the peopleinline	
						   $scope.changeStatus30 = function(){
								console.log("clicked");
						
								$http.post('/user/postinfo30', 
								{ "store": $scope.store })
									.success(function( data) {
									$scope.contacts = data;
									console.log (data);
								}, function(posts) {});
					
							}
					
	//Places a name in the database to add to the Lineup                  $rootScope.name
	//THIS IS WHERE the user who has the app needs to be add there name to it...		
				      $scope.submitName = function(){
							      //  contacts.set($scope.contact);
			      					$http.post('/user/postinfo', {
								    name: $scope.name,
									  email: $scope.useremail,
									
							/*
									  name: 'Jacob Latouf2234',
									  email: 'Black@White.com',
									  phone: $scope.contact.phone,
									  website: $scope.contact.website,
							  	  address: $scope.contact.address,
									  notes: $scope.contact.notes,
							*/
			
								}).success(function() {
									console.log('Post success');
								//	$location.path('/login');
						$route.reload();
						  //$location.path('/'); // This works as expected, if path != current_path
			
								}).error(function() {
									console.log('Post failure');
								});
								$scope.SendUserData = '';
			
							        $scope.contact = null;
							        $scope.added = true;
						    };
			
			
		//*****THESE ARE NOT CURRENTLY IN THE PAGE*******	
		
					$scope.positioni = function(contact){
							console.log("LineIn " + contact);
							
						$rootScope.grabLineIn = contact;
						console.log ("LineIn Saved in variable: " + $scope.grabLineIn);
						//THEREFORE USE $scope.grabLineIn to pass the vaariable to the next page:
					}
			
					$scope.distance = function(contact){
							console.log("LineIn " + contact);
							
						$rootScope.grabLineIn = contact;
						console.log ("LineIn Saved in variable: " + $scope.grabLineIn);
						//THEREFORE USE $scope.grabLineIn to pass the vaariable to the next page:
					}
			
					$scope.other = function(contact){
							console.log("LineIn " + contact);
							
						$rootScope.grabLineIn = contact;
						console.log ("LineIn Saved in variable: " + $scope.grabLineIn);
						//THEREFORE USE $scope.grabLineIn to pass the vaariable to the next page:
					}
		//**************************************

	  }]);
 

	 angular.module('myApp').controller('trackPositionController',  ['$scope',  '$http',   '$rootScope', '$route',
function ($scope, $http, $rootScope, $interval, $route) {




									$scope.store = "Walmart";
									$rootScope.usernames = "Jacob";
//This button gets the Coordinates					
						  // wire up button click
					$(document).ready(function () {
						  // wire up button click
						 // $('#go').click(function () {
						    // test for presence of geolocation
						    if(navigator && navigator.geolocation) {
						      // make the request for the user's position
						      navigator.geolocation.getCurrentPosition(geo_success, geo_error);
						    } else {
						      // use MaxMind IP to location API fallback
						      printAddress(geoip_latitude(), geoip_longitude(), true);
						    }
					 //     });
					 });
		
		
						 			//THIS IS THE CODE TO PROGRAM THE BUTTON
						 			$(document).ready(function () {
						  // wire up button click
						  $('#go').click(function () {
						    // test for presence of geolocation
						    if(navigator && navigator.geolocation) {
						      // make the request for the user's position
						      navigator.geolocation.getCurrentPosition(geo_success, geo_error);
						    } else {
						      // use MaxMind IP to location API fallback
						      printAddress(geoip_latitude(), geoip_longitude(), true);
						    }
						  });
						});
						 
						 
				function geo_success(position) {
				  printAddress(position.coords.latitude, position.coords.longitude);
				  $rootScope.lat1 = position.coords.latitude;
				  $rootScope.long1 = position.coords.longitude;
				  console.log ("latitude1: " + position.coords.latitude)
				  console.log ("longitude1: " + position.coords.longitude)
				}
				 
				function geo_error(err) {
				  // instead of displaying an error, fall back to MaxMind IP to location library
				  printAddress(geoip_latitude(), geoip_longitude(), true);
				}
						 
	// use Google Maps API to reverse geocode our location
				function printAddress(latitude, longitude, isMaxMind) {
				    // set up the Geocoder object
						    var geocoder = new google.maps.Geocoder();
						 
				    // turn coordinates into an object
				    var yourLocation = new google.maps.LatLng(latitude, longitude);
				 
				    // find out info about our location
				    geocoder.geocode({ 'latLng': yourLocation }, function (results, status) {
				    if(status == google.maps.GeocoderStatus.OK) {
				      if(results[0]) {
				        $('#results').fadeOut(function() {
				          $(this).html('<p><b>Abracadabra!</b> My guess is:</p><p><em>' + results[0].formatted_address  +  '</em></p>').fadeIn();
				         
				                     var searchAddressComponents = results[0].address_components,
				    searchPostalCode="";

					$.each(searchAddressComponents, function(){
					    if(this.types[0]=="postal_code"){
					        searchPostalCode=this.short_name;
					        console.log(searchPostalCode);
					     //   $rootScope.postal = searchPostalCode;
					        //        console.log("Postal code" + $scope.postal);
					                
					var newpostalcode = searchPostalCode.substr(0, searchPostalCode.length-4);
					console.log('newpostal' + newpostalcode);
					$rootScope.postal2 = newpostalcode;
					
					    }
					});
	
	
			//$http.post('/user/postinfo25', { "postal": $scope.postal2 }).success(function( data) {$scope.contacts = data;
			$http.post('/user/postCord', { "store": "Walmart" }).success(function( data) {$scope.contacts = data;

								console.log (data);
								}, function(posts) {});
					
					          console.log('formatted_address' + results[0].formatted_address);
					        })
					      } else {
					        error('Google did not return any results.');
					      }
					    } else {
					      error("Reverse Geocoding failed due to: " + status);
					    }
					  });
					  
					  
					  
					 
					 
							  // if we used MaxMind for location, add attribution link
							  if(isMaxMind) {
							    $('body').append('<p><a href="http://www.maxmind.com" target="_blank">IP to Location Service Provided by MaxMind</a></p>');
							  }
							}
								 
					function error(msg) {
					  alert(msg);
					}
								
//find stores that match name
				   $scope.changeStatus30 = function(){
						console.log("clicked");
				
						$http.post('/user/postinfo30', 
						{ "store": $scope.store })
							.success(function( data) {
							$scope.contacts = data;
							console.log (data);
						}, function(posts) {});
			
					}
			
//Grabs the name of Store			
				$scope.grabStuff = function(contact){
							console.log("Name of Store " + contact);
							
						$rootScope.grabStorename = contact;
						console.log ("Name of Store variable: " + $scope.grabStorename);
						//THEREFORE USE $scope.grabLineIn to pass the vaariable to the next page:
					}
			
//Submits the store to add to 			
				      $scope.submitName = function(){
						$http.post('/user/postStore', 
							{"store": $scope.storetoAdd }).
							success(function() {
							console.log('Post success');
							console.log($scope.storetoAdd)
					console.log('success')
								}).error(function() {
									console.log('Post failure');
								});
						    };

//Submits the coordinates that are calc by GPS
				      $scope.submitCoordinates = function(){
						$http.post('/user/postCoordinates', 
							{"username": $scope.usernames, "latitude" :$scope.lat1 , "longitude" : $scope.long1}).
							success(function() {
							console.log('Post success');
							console.log($scope.storetoAdd)
					console.log('success')
								}).error(function() {
									console.log('Post failure');
								});
						    };

			/*
					// ALL ANSWERS ARE IN METERS!!!!!!!!!!
					// DIVIDE ANSWER ON ANDROID BY 1000 TO GET KILOMETERS.....
					Location location1 = new Location("locationA");
					location1.setLatitude(d2);
					location1.setLongitude(d);
					Location location2 = new Location("locationB");
					location2.setLatitude(doublefirst);
					location2.setLongitude(doublesecond);
					double distance = location1.distanceTo(location2);
		*/



	        }]);
	        
				        
angular.module('myApp').controller('geo4Controller',  ['$scope',  '$http', '$socket',  '$rootScope', '$route', '$location', 
function ($scope, $http, $socket, $rootScope, $interval, $route, $location) {
			
			        	    	//console.log("FFFFFFFFFFFFFFFFFFFFFFF"+ user);

  var socket = io.connect('http://localhost:3000');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });



//Interval that will continuously add the 		
							function myFunction() {
			setInterval(function(){ myFunction2(); }, 5000);
				}
			
			
			
//Finds the GPS Coordinates		
					    
				  if (navigator.geolocation) {
				  					    	    		//			  setInterval(function(){ 
				    navigator.geolocation.getCurrentPosition(function(position){
				    	    					   setInterval(function(){ 
				
				      $scope.$apply(function(){
				        $scope.position = position;
				        console.log(position);
						       $scope.latnumber = position.coords.latitude;
								$scope.longnumber = position.coords.longitude;
								
								$rootScope.lats = position.coords.latitude;
								$rootScope.longs = position.coords.longitude;

						//$scope.showstuff1 = true;
						
					//1) Subtract
						//	var lat = $scope.address1 - $scope.latnumber
						var lat = 82 - $scope.latnumber
						
						//	var lng = $scope.notes1 - $scope.longnumber
						var lng = 84 - $scope.longnumber
						    console.log('latnumber: '+ lat ) 
						    console.log('longnumber: ' + lng ) 
				
					//2) Exponent of two		
							//This returns the squared value: Math.pow(x,y)
							var lat_2 = Math.pow(lat, 2);
						 	var lng_2 = Math.pow(lng, 2);
							
						    console.log('2 times latnumber: '+ lat_2 ) 
						    console.log('2 times longnumber: ' + lng_2 ) 
					//3) Subtract:
							var latlng = lat_2 - lng_2;
							var abs = Math.abs(latlng);
				
						    console.log('Subtract numbers: '+ abs ) 
					
					//4) Square Root:
							var distance = Math.sqrt(abs);
							
							$scope.distanceNumber = distance;
							$rootScope.dists = distance;
							/*
							 * I think that this is in meters 
							 */
						    console.log('Distance: '+ distance ) 			
							
				      });
				            				    	}, 3000);
				
				    });
				    				            			//	    	}, 3000);

				  }
				

			
//Third
//Responds to backend to past table data on frontend

				$socket.on('echo3', function (data) {
		                $scope.serverResponse3 = data;
		                // $scope.serverResponse4 = data.data1;

		                        console.log('Socket ON');
							myData();
		            });



//Third
/*
		            $scope.postedSTUFF3 = function postedSTUFF3() {
		                console.log('postedUsername2 sent');
				             //   $socket.emit('echo', $scope.dataToSend);
				       //   $socket.emit('postedinfo', { username : $scope.SendUserData2, body: $scope.SendUserData3});

		                $socket.emit('echoinformation3', {data : $scope.dataToSend3, data1 : $scope.dataToSend4});

		            };
 */          

//Emits Socket to backend  		            
		            $scope.postedSTUFF3 = function postedSTUFF3() {
		                console.log('postedUsername2 sent');
				             //   $socket.emit('echo', $scope.dataToSend);
				       //   $socket.emit('postedinfo', { username : $scope.SendUserData2, body: $scope.SendUserData3});

		                $socket.emit('echoinformation3', {latitude : $scope.lats, longitude : $scope.longs, 
		                	distance : $scope.dists});
		                        console.log('Socket ON');

		            };

		            $scope.postedSTUFF44 = function postedSTUFF44() {
		                console.log('postedUsername2 sent');
				             //   $socket.emit('echo', $scope.dataToSend);
				       //   $socket.emit('postedinfo', { username : $scope.SendUserData2, body: $scope.SendUserData3});

		               $socket.emit('sendstuff', {latitude : $scope.lats, longitude : $scope.longs, 
		                	distance : $scope.dists});
		                        console.log('Socket ON');

		            };

//Posts the Coordinate data on the table after socket emits
		function myData() {

				 $http.get('/user/getCords').success(function(data) {
						$scope.contacts = data
						console.log( data);
							console.log('THIS IS DATA ' +data[0].latitude);
							console.log('THIS IS latitude ' +data[0].longitude);
							
							$rootScope.address1 = data[0].latitude;
							$rootScope.notes1 = data[0].longitude;
							
						 // console.log('ROOTSCOPE Latitude '+$scope.address1);
						  //console.log('ROOTSCOPE Longitude '+$scope.notes1);
						
						}, function(posts) {});

		           }
		           
		            
		            
        $scope.emitBasic7 = function emitBasic7() {
		                console.log('emitBasic7 sent');
		                $socket.emit('echoinformation', "WHITE");
		            };
		
		
	        }]);
