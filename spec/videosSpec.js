'use strict';

describe('videosController', function () {
  var $scope, $rootScope, createController, Video, $window, $location, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(angular.mock.module('crossVid.videos'));
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
      return $controller('videosController', {
        $scope: $scope,
        Video: Video,
        $window: $window,
        $location: $location
      });
    };

  }));

  

  it('should have videos property on the $scope', function () {
    createController();
    expect($scope.videos).toBeDefined();
  });

  it('should have a function called getVideos', function() {
      createController();
      expect(typeof $scope.getVideos).toBe('function');
    }); 
  
  it('should have a function called selectVideo', function() {
      createController();
      expect(typeof $scope.selectVideo).toBe('function');
  }); 


  // it('should call `Video.getVideos()` when controller is loaded', function () {
  //   sinon.spy(Video, 'getVideos');
  //   $httpBackend.expectGET('/videos').respond(200);

  //   createController();
  //   // $httpBackend.flush();

  //   expect(Video.getVideos.called).toEqual(true);
  //   // Video.getVideos.restore();
  // });

  // it('should populate the videos property after the call to `Video.getVideos()`', function () {
  //   var mockVideos = [Object({  }), Object({  }), Object({  }) ];
  //   $httpBackend.expectGET('/videos').respond(mockVideos);

  //   createController();
  //   // $httpBackend.flush();

  //   expect($scope.videos).toEqual(mockVideos);
  // });
});
