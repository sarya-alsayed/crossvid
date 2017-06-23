angular.module('crossVid.video', [])
.controller('videoController', function ($scope, Video, $window, $location) {
	var currentSession = $window.localStorage.getItem('sessionId');
	var getVideos = function(){
		Video.getVideos(currentSession)
			.then(function (videosResult) {
				console.log(videosResult);
				$scope.videos = videosResult.data;
			})
			.catch(function (error){
				console.log(error);
			})
	}

	getVideos();

	$scope.selectVideo = function (videoId) {
		$location.path('/video');
		$window.localStorage.setItem('videoId', videoId);
	}

	var getOneVideo = function () {
		Video.getOneVideo(currentSession, $window.localStorage.getItem('videoId'))
			.then(function (videoResult) {
				console.log(videoResult)
				$scope.video = videoResult.data;
			})
			.catch(function (error) {
				console.log(error);
			})

	}

	getOneVideo();

	$scope.rateVideo = function (videoId) {
		Video.rateVideo(currentSession, videoId, 5)
			.then(function (ratingResult) {
				console.log(ratingResult)
			})
			.catch(function(error){
				alert('An Error Occured !');
				console.log('errrrrr', error)
			})
	}


});
