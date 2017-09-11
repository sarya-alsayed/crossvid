'use strict';

describe('Services', function () {
  beforeEach(angular.mock.module('crossVid.services'));

  afterEach(inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));

  // test for Video Factory
  describe('Video Factory', function () {
    var $httpBackend, Video;

    beforeEach(inject(function (_$httpBackend_, _Video_) {
      $httpBackend = _$httpBackend_;
      Video = _Video_;
    }));

    it('should exist', function () {
      expect(Video).toBeDefined();
    });

    it('should have a method `getVideos`', function () {
      expect(typeof Video.getVideos).toBe('function');
    });

    it('should have a method `getOneVideo`', function () {
      expect(typeof Video.getOneVideo).toBe('function');
    });

    it('should have a method `rateVideo`', function () {
      expect(typeof Video.rateVideo).toBe('function');
    });

    it('should get all Videos with `getVideos`', function () {
      var mockResponse = [
        { name: '[0] Getting Started With ReactJs',
          url : "videos/Getting_Started_With_React.js.mp4" ,
          description: 'videoDes',
          ratings: [1,3]
        },
        { name: ' Started With ReactJs',
          url : "videos/Getting_React.js.mp4" ,
          description: 'videoDes11',
          ratings: [1,3,5]
        }
      ];

      $httpBackend.expect('GET', '/videos').respond(mockResponse);

      Video.getVideos().then(function (videos) {
        expect(videos).toEqual(mockResponse);
      });

      $httpBackend.flush();
    });

    it('should get one Video with `getOneVideo`', function () {
      var mockResponse = [
        { name: '[0] Getting Started With ReactJs',
          url : "videos/Getting_Started_With_React.js.mp4" ,
          description: 'videoDes',
          ratings: [1,3]
        }     
     ];

      $httpBackend.expect('GET', '/video').respond(mockResponse);
        Video.getOneVideo().then(function (video) {
        expect(video).toEqual(mockResponse);
      });

      $httpBackend.flush();
    });

    it('should add a new rate to specific video with `rateVideo`', function () {
      var mockResponse = {
        _id: '594bc670f39da404ec9ece9f',
        name:'my video',
        url: 'video/myVideo',
        description: 'my special video',
        ratings:[1]
      }
      $httpBackend
        .expect('POST', '/video/ratings?sessionId=4')
        .respond(mockResponse);

      Video.rateVideo('4', mockResponse._id, 5).then(function (resp) {
        expect(resp).toEqual(mockResponse);
      });

      $httpBackend.flush();
    });

  });

  // test for User Factory 
  describe('User Factory', function () {
    var $httpBackend, User;

    beforeEach(inject(function (_$httpBackend_, _User_) {
      $httpBackend = _$httpBackend_;
      User = _User_;
    }));

    it('should exist', function () {
      expect(User).toBeDefined();
    });

    it('should have a method `login`', function () {
      expect(typeof User.login).toBe('function');
    });

    it('should have a method `logout`', function () {
      expect(typeof User.logout).toBe('function');
    });

    it('should remove active session for user with `logout`', function () {
      var mockResponse = [
        { username: 'ali',
          password : 'password' ,
          activeSession: ''
        }
      ];

      $httpBackend.expect('GET', '/user/logout').respond(mockResponse);
      User.logout().then(function (resp) {
        expect(resp).toEqual(mockResponse);
      });

      $httpBackend.flush();
    });

    it('should Authenticate user and get active session with `login`', function () {
      var mockResponse = { 
          username: 'ali',
          password : 'password' 
        }
      $httpBackend
        .expect('POST', '/user/auth')
        .respond(mockResponse);

      User.login(mockResponse).then(function (resp) {
        expect(resp).toEqual(mockResponse);
      });

      $httpBackend.flush();
    });

  });

});


