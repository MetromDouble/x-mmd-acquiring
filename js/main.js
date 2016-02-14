define(['controllers', 'services'], function() {});

var xMmdAddrbook = angular.module('xMmdAddrbook', ['ngRoute', 'xmabControllers', 'xmabServices']);
xMmdAddrbook.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'tplparts/cards.html',
        controller: 'PhoneListCtrl'
      }).
      when('/add-contact', {
        templateUrl: 'tplparts/addcontact.html',
        controller: 'PhoneListCtrl'
      }).
      when('/table-view', {
        templateUrl: 'tplparts/table.html',
        controller: 'PhoneListCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
