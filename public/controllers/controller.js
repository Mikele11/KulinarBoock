var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("I am in controller");
	$scope.filteredTodos = []
   ,$scope.currentPage = 1
   ,$scope.numPerPage = 2
   ,$scope.maxSize = 5;

var refresh = function() {
  $http.get('/bookday').success(function(response) {
    console.log("Geter");
    $scope.bookday = response;
	console.log($scope.bookday);
	$scope.len=$scope.bookday.length;
	$scope.page=Math.ceil($scope.len/$scope.numPerPage);
	console.log($scope.page);
    $scope.contact = "";
  });
};

refresh();
//панинация
  $scope.numPages = function () {
	$http.get('/bookday').success(function(response) {
    $scope.bookday = response;
    $scope.numPages= Math.ceil($scope.bookday.length / $scope.numPerPage);
	console.log($scope.bookday.length+'+++++++');
  });  
  };
  
  $scope.$watch('currentPage + numPerPage', function() {
	$http.get('/bookday').success(function(response) {
	var begin = (($scope.currentPage - 1) * $scope.numPerPage);
    var end = begin + $scope.numPerPage; 
    $scope.filteredTodos = $scope.bookday.slice(begin, end);
	}); 
  });  
//конец пагинации
$scope.addContact = function() {
  console.log($scope.contact);
  //---------------	
	var d1 = new Date();
	var d1Year = d1.getFullYear();
	var d1Month = d1.getMonth();
	var d1Day = d1.getDate();
	var d2;
	//--------------------------------------------------
	d1Month=d1Month+1;
	if (d1Month<10){
		d2=d1Day+'.'+'0'+d1Month+'.'+d1Year;
	}else{
		d2=d1Day+'.'+d1Month+'.'+d1Year;
	};
	$scope.contact.registr=d2;
	//--
  $http.post('/bookday', $scope.contact).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/bookday/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/bookday/' + id).success(function(response) {
    $scope.contact = response;
  });
};  

$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/bookday/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.contact = "";
}

}]);﻿