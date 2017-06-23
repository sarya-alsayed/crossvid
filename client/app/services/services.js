angular.module('crossVid.services', [])

.factory('User', function ($http) {
 
	var login = function (user) {
		return $http({
			method: 'POST',
			url: '/user/auth',
			data: user
		})
		.then( function(resp){
			return resp.data;
		})
	};

	var logout = function (sessionId) {
		return $http({
			method: 'GET',
			url: '/user/logout',
			params: {sessionId: sessionId}
		})
		.then( function(resp){
			return resp.data;
		})
	};

	return {
		login: login,
		logout: logout
	};


})
.factory('Video', function ($http) {
 
	var getVideos = function (sessionId, skip, limit) {
		return $http({
			method: 'GET',
			url: '/videos',
			params: {sessionId: sessionId, skip: skip, limit: limit}
		})
		.then( function(resp){
			return resp.data;
		})
	};

	var getOneVideo = function (sessionId, videoId) {
		return $http({
			method: 'GET',
			url: '/video',
			params: {sessionId: sessionId, videoId: videoId} 
		})
		.then( function(resp){
			return resp.data;
		})
	};

	var rateVideo = function (sessionId, videoId, rating) {
		return $http({
			method: 'POST',
			url: '/video/ratings',
			params: {sessionId: sessionId} ,
			data: {videoId: videoId, rating: rating}
		})
		.then( function(resp){
			return resp.data;
		})
	};

	return {
		getVideos: getVideos,
		getOneVideo: getOneVideo,
		rateVideo: rateVideo
	};


})

	
	