'use strict';

describe('userController', function () {
  var $scope, $rootScope, createController, User, $window, $location, $httpBackend, $anchorScroll;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(angular.mock.module('crossVid.user'));
  beforeEach(angular.mock.module('crossVid.services'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $window = $injector.get('$window');
    $location = $injector.get('$location');
    $anchorScroll = $injector.get('$anchorScroll');
    User = $injector.get('User');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('userController', {
        $scope: $scope,
        User: User,
        $window: $window,
        $location: $location,
        $anchorScroll: $anchorScroll
      });
    };

  }));


  it('should have a function called login', function() {
      createController();
      expect(typeof $scope.login).toBe('function');
  }); 

  it('should have a function called logout', function() {
      createController();
      expect(typeof $scope.logout).toBe('function');
  }); 

});
