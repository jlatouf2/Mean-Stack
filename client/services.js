angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http', '$rootScope',
  function ($q, $timeout, $http, $rootScope) {

    // create user variable
    var user = null;

    // return available functions for use in controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
      confirm: confirm
    });

    function isLoggedIn() {
        if(user) {
          return true;
        } else {
          return false;
        }
    }
    
    /*
        var user2 = null;

    function isLoggedIn2() {
        if(user2) {
          return true;
        } else {
          return false;

        }
    }
*/

    function getUserStatus() {
      return user;
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login', {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }
    
   

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register', {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }
    
        function confirm() {

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
    }

/*
 * 1.Facebook button 
 */

}]);