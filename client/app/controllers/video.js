angular.module('crossVid.video', [])
.controller('videoController', function ($scope, Video, $window, $location) {
	var currentSession = $window.localStorage.getItem('sessionId');
	var skip = 0;
	$scope.videos = [];
	$scope.getVideos = function () {
		if ($scope.videos.length === 0){
			getAllVideos();
		}
		else{
			skip = skip + 6;
			getAllVideos();
		}
	}

	var getAllVideos = function(){
		// skip = skip +9;
		console.log('skip',skip)
		Video.getVideos(currentSession, skip,6)
			.then(function (videosResult) {

				// console.log(videosResult.data);
	
				for (var i=0; i<videosResult.data.length; i++){
					//videosResult.data[i].description= getWords(videosResult.data[i].description)
				$scope.videos.push(videosResult.data[i]);

				}
				console.log('cccccccc',$scope.videos)
				// $scope.videos = videosResult.data;
				
			})
			.catch(function (error){
				console.log(error);
			})
	}
// var getVideosss = function(){
// 		Video.getVideos(currentSession)
// 			.then(function (videosResult) {
// 				console.log(videosResult);
// 				// for (var i=0; i<videosResult.data.length; i++){
// 				// 	videosResult.data[i].description= getWords(videosResult.data[i].description)
// 				// }
// 				$scope.videoss = videosResult.data;
// 			})
// 			.catch(function (error){
// 				console.log(error);
// 			})
// 	}
// 	getVideosss();

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

	function getWords(str) {
	    return str.split(/\s+/).slice(0,6).join(" ");
	}


});
