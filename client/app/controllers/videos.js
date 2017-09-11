angular.module('crossVid.videos', [])
.controller('videosController', function ($scope, Video, $window, $location) {
	var currentSession = $window.localStorage.getItem('sessionId');
	var skip = 0;
	$scope.videos = [];
	console.log('$scope.videos', $scope.videos)
	// get video when user scroll down for lazy loading with infinit scroll
	$scope.getVideos = function () {
			getAllVideos();
			skip = skip + 6;
	}

	// get videos function
	var getAllVideos = function(){
		Video.getVideos(currentSession, skip,6)
			.then(function (videosResult) {
				console.log(videosResult)
				for (var i=0; i<videosResult.data.length; i++){
					$scope.videos.push(videosResult.data[i]);
				}			
			})
			.catch(function (error){
				console.log(error);
			})
	}

	// move to video page for video details
	$scope.selectVideo = function (videoId) {
		$location.path('/video');
		$window.localStorage.setItem('videoId', videoId);
	}

	// for paly one video at the same time
	document.addEventListener('play', function(e){
	    var videos = document.getElementsByTagName('video');
	    for(var i = 0, len = videos.length; i < len;i++){
	        if(videos[i] != e.target){
	            videos[i].pause();
	        }
	    }
	}, true);

});
