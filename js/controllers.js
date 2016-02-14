var xmabControllers = angular.module('xmabControllers', []);

xmabControllers.controller('PhoneListCtrl', ['$scope', '$rootScope', 'contactSync', function ($scope, $rootScope, contactSync) {
    $scope.contacts = contactSync.refresh($scope);
    $scope.newContact = {};

    $scope.addNew = function () {
      contactSync.addContact($scope, $scope.newContact);
    };
    $scope.delete = function (id) {
      contactSync.deleteContact($scope, id);
    };
    $rootScope.orderProp = 'name';
}]);
