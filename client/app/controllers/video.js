angular.module('crossVid.video', [])
.controller('videoController', function ($scope, Video, $window, $location) {
	var currentSession = $window.localStorage.getItem('sessionId');
	$scope.video = [];
	var getOneVideo = function () {
		Video.getOneVideo(currentSession, $window.localStorage.getItem('videoId'))
			.then(function (videoResult) {
				console.log(videoResult)
				$scope.videoInfo = videoResult.data;
				$scope.video.push(videoResult.data);
			
			})
			.catch(function (error) {
				console.log(error);
			})

	}

	getOneVideo();

	$scope.rateVideo = function (videoId) {
		Video.rateVideo(currentSession, videoId, $scope.rate)
			.then(function (ratingResult) {
				console.log(ratingResult)
				alert('thanks for rating video!');
			})
			.catch(function(error){
				alert('Please Select Rating Star Befor!');
				console.log('errrrrr', error)
			})
	}

	
	$("#stars-default").rating('create',{onClick:function(){
	  $scope.rate = this.attr('data-rating');
	  console.log($scope.rate)
	}});

});
