angular.module('starter.controllers', [])
.controller('loginCtrl', function($scope, $stateParams) {
})
.controller('signupCtrl', function($scope,$state, $stateParams) {
    $scope.signin=function(){
        $state.go("login");
    }
})
.controller('forgotpasswordCtrl', function($scope,$state, $stateParams) {
      $scope.pin=function(){
        $state.go("forgotpin");
    }
})
.controller('forgotpinCtrl', function($scope, $state, $stateParams) {
       $scope.signin=function(){
        $state.go("login");
    }
})
;