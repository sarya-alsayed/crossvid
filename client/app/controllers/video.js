angular.module('crossVid.video', [])
.controller('videoController', function ($scope, Video, $window, $location) {
	var currentSession = $window.localStorage.getItem('sessionId');
	$scope.video = [];

	// get one video information
	$scope.getOneVideo = function () {
		Video.getOneVideo(currentSession, $window.localStorage.getItem('videoId'))
			.then(function (videoResult) {
				$scope.videoInfo = videoResult.data;
				$scope.video.push(videoResult.data);		
			})
			.catch(function (error) {
				alert('An Error Ocurred!');
			})
	}

	$scope.getOneVideo();

	// rate video from user
	$scope.rateVideo = function (videoId) {
		var rate = document.getElementById('stars-default').getAttribute('data-rating')
		Video.rateVideo(currentSession, videoId, rate)
			.then(function (ratingResult) {
				alert('thanks for rating video!');
				$('#submit').hide();

			})
			.catch(function(error){
				alert('Please Select Rating Star Before!');
			})
	}

	var getVideos = function(){
		Video.getVideos(currentSession, 0,6)
			.then(function (videosResult) {
				$scope.videos = videosResult.data;		
			})
			.catch(function (error){
				console.log(error);
			})
	}

	getVideos();

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
