'use strict';

describe('videoController', function () {
  var $scope, $rootScope, createController, Video, $window, $location, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(angular.mock.module('crossVid.video'));
  beforeEach(angular.mock.module('crossVid.services'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $window = $injector.get('$window');
    $location = $injector.get('$location');
    Video = $injector.get('Video');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('videoController', {
        $scope: $scope,
        Video: Video,
        $window: $window,
        $location: $location
      });
    };

  }));

  it('should have video property on the $scope', function () {
    createController();
    expect($scope.video).toBeDefined();
  });

  it('should have a function called rateVideo', function() {
    createController();
    expect(typeof $scope.rateVideo).toBe('function');
  }); 

  it('should call `Video.getOneVideo()` when controller is loaded', function () {
    sinon.spy(Video, 'getOneVideo');
    $httpBackend.expectGET('/video').respond(200);
    createController();
    expect(Video.getOneVideo.called).toEqual(true);
  });

  it('should populate the video property after the call to `Video.getOneVideo()`', function () {
    var mockVideo = [{
      _id: '594bc670f39da404ec9ece9f',
      name:'my video',
      url: 'video/myVideo',
      description: 'my special video',
      ratings:[1]
    }];
    $httpBackend.expectGET('/video').respond(mockVideo);
    createController();  
    Video.getOneVideo('4',mockVideo._id).then(function (resp) {
        expect($scope.video).toEqual(mockVideo);
    });
   
  });
});
