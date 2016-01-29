//this is the Routs app
var myApp = angular.module('myApp', ['ngRoute' , 'socket.io' , 'ngCookies' , 'ngStorage',]);

myApp.config(function ($routeProvider, $socketProvider) {
	
	$socketProvider.setConnectionUrl('http://localhost:3000');
	
	  $routeProvider
	    .when('/', {
	    	templateUrl: 'partials/home.html',
	    	 access: {restricted: false}
	
	     })
	    .when('/login', {
	      templateUrl: 'partials/login.html',
	      controller: 'loginController',
	      access: {restricted: false}
	    })
	    .when('/logout', {
	      templateUrl: 'partials/logout.html',
	      controller: 'logoutController',
	      access: {restricted: false}
	    })
	    .when('/register', {
	      templateUrl: 'partials/register.html',
	      controller: 'registerController',
	      access: {restricted: false}
	    })
	        .when('/contact', {
	      templateUrl: 'partials/contact.html',
	      controller: 'contactController',
	      access: {restricted: false}
	    })

	     .when('/contacts/:id', {
        controller: 'contactsController',
        templateUrl: 'partials/contacts.html',
              access: {restricted: false}
    }) 

    

            .when('/NameList', {
      templateUrl: 'partials/NameList.html',
      controller: 'NameListController',
       access: {restricted: false}
    })
    
                .when('/showuser', {
      templateUrl: 'partials/showuser.html',
      controller: 'showuserController',
       access: {restricted: false}
    })
    
            .when('/add', {
      templateUrl: 'partials/add.html',
      controller: 'addController',
       access: {restricted: false}
    })
    
            .when('/storenames', {
      templateUrl: 'partials/Storenames.html',
      controller: 'storenamesController',
       access: {restricted: false}
    })

            .when('/storelines', {
      templateUrl: 'partials/storelines.html',
      controller: 'storelinesController',
       access: {restricted: false}
    })

	    	.when('/peopleinline', {
        controller: 'peopleinlineController',
        templateUrl: 'partials/peopleinline.html',
              access: {restricted: false}
    }) 
    
    	    	.when('/geo4', {
        controller: 'geo4Controller',
        templateUrl: 'partials/geo4.html',
              access: {restricted: false}
    }) 


            .when('/trackPosition', {
      templateUrl: 'partials/trackPosition.html',
      controller: 'trackPositionController',
       access: {restricted: false}
    })


    .otherwise({redirectTo: '/'});
});


myApp.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});



myApp.factory('checkboxService', function() {
  var checkboxService = {
    city: [
      {"id" : 1, "name" : "Firstplace"},
      {"id" : 2, "name" : "Second place"},
      {"id" : 3, "name" : "Thirdplace"},
      {"id" : 4, "name" : "Fourthplace"},
      {"id" : 5, "name" : "Fifth place"}
    ],
    state: [
      {"id" : 6, "name" : "yellow dog"},
      {"id" : 7, "name" : "bluedog"},
      {"id" : 8, "name" : "cobalt dog"},
      {"id" : 9, "name" : "purple dog"},
      {"id" : 10, "name" : "greendog"}  
    ],
    checks: {
      city: [],
      state: []
    }
  };
  return checkboxService;
});

myApp.factory('checkboxService2', function($scope) {
			    // This works
			    	    //$scope.status = "true";

			  /*
		    $scope.fooBar = false;

$scope.logConsole = function () {
    console.log("Value is : " + $scope.fooBar);
    console.log("Type is : " + typeof $scope.fooBar); //Always displays 'string'
};
*/
	
});


myApp.factory("People",function(){
  var People = [
    {
      name: "Joe Watkins",
      position: "UX Developer",
      skills: "HTML CSS Javascript"
    },
    {
      name: "Jen Smithers",
      position: "Dev Ops",
      skills: "Alien Server Technology"
    },
    {
      name: "Paul Anderson",
      position: "Designer",
      skills: "UI & UX Design"
    },
    {
      name: "Samantha Barton",
      position: "Javascript Ninja",
      skills: "All things JS"
    }
  ];
  
  return People;
});






//This is variable to save data to and pass to other controllers in rootscope
         	var block = null;


//THIS IS THE RESTRICTED ACCESS FUNCTION:
    // create user variable
    var user2 = null;

    function isLoggedIn2() {
        if(user2) {
          return true;
        } else {
          return false;

        }
    }


/*
 
use http to check database if Admin = 0 or 1;
2) store value from db in $rootScope.userrole = data.Admin; (or data[0].Admin, if JSON);
3) then make function isAdmin() { if(userrole = 0) { return true; { else {return false;}}
4) then when you can make use of: 
  
  <span ng-hide="userrole">
	<a href="#register">Register</a>
	<a href="#login">login</a>
</span>

-> OR: if you want to change some function use :
	  	if(isAdmin() === true) { }

 */

myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && AuthService.isLoggedIn() === false) {
      $location.path('/login');
    }
  });
});




myApp.run(function ($rootScope, $location, AuthService, $http) {
	//  $rootScope.$on('$routeChangeStart', function (event, next, current) {
	//  	if(isLoggedIn2() ===false) {
    $http.get('/confirm-login')
        .success(function (data) {
        	            if (data) {
        	            	            user2 = true;
console.log(user2);
        	     	console.log("FFFFFFFFFFFFFFFFFFFFFFF"+data.username);
        	     	console.log(data);

                $rootScope.userdata = data;

                $rootScope.useremail = data.facebook.email;
                $rootScope.name = data.facebook.displayName;
                $rootScope.id = data._id;
                $rootScope.token = data.facebook.token;

              // var dog = JSON.parse(user);
               // console.log('Userdata' + user);
                                console.log('data.username: ' + data.username);
                               // console.log('Userdata' + data);
                                console.log('_id: ' + data._id);
                                console.log('fbid: ' + data.facebook.fbid);
			                    console.log('displayName: ' + data.displayName);
                                console.log('Facebook.email: ' + data.facebook.email);
                                 console.log('Facebook.displayName: ' + data.facebook.displayName);
                                 console.log('Facebook.token: ' + data.facebook.token);
		// use req.data.destroy or $rootScope.useremail = ""; OR $scope.useremail = "";
            }
		


              });
	//			}
      //  });
       
});

