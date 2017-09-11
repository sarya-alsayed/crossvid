angular.module('crossVid.user', [])
.controller('userController', function ($scope, User, $window, $location, $anchorScroll) {
	// authnticate user
	$scope.login = function () {
		var user={};
		user.username = $scope.userName;
		user.password = CryptoJS.MD5($scope.password).toString(); 
		User.login(user)
			.then(function (userResult) {
				console.log(userResult);
				$window.localStorage.setItem('sessionId',userResult.sessionId);
				$location.path('/videos');
			})
			.catch(function (error) {
				alert('Invalid username or password !')
			})
	};

	$scope.logout = function (){
		User.logout($window.localStorage.getItem('sessionId'))
			.then (function (result){
				console.log(result)
				$window.localStorage.removeItem('sessionId');
				$location.path('/user/auth');

			})
			.catch(function (error){
				alert('An Error Occured !');
			})
	}

	// scroll to login div
	$scope.gotoBottom = function() {
      $location.hash('contact');
      $anchorScroll();
    };
	

});
