angular.module('crossVid', [
  'crossVid.user',
  'crossVid.video',
  'crossVid.videos',
  'crossVid.services',
  'ngRoute',
  'infinite-scroll'
  
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
  .when('/user/auth', {
    templateUrl: '../home.html', 
    controller: 'userController'
    })
  .when('/videos', {
    templateUrl: '../videos.html', 
    controller: 'videosController'
    })
  .when('/video', {
    templateUrl: '../video.html', 
    controller: 'videoController'
    })
  .otherwise({
      redirectTo: '/user/auth'
    });
    
})

