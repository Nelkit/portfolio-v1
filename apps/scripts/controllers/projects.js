'use strict';

/**
 * @ngdoc function
 * @name frontendMatriculaApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the frontendMatriculaApp
 */
var angular;
angular.module('BlogApp')
  .controller('ProjectsCtrl', ['$scope', '$http',function ($scope, $http) {
  	var urlBase = "http://d3ka4gl7g4ooi1.herokuapp.com/api/";
  	var urlBlog = "projects/"
  	var jsonP = '?min=0&max=12';
    var postLoaded = {
      cargados: 0, 
    }
    $scope.projects = []

  	//funcion para cargar datos
    $scope.loadData = function(min,max) {
        $scope.spinState = 'show';

        $http.get(urlBase + urlBlog + '?min='+min+'&max='+max, { cache: true})
        .success(function(data){
            if(data.length === 1){
              $scope.projects.push(data[0])
            }
            $scope.spinState = 'hide';
        })
        .error(function (data, status) {
          if (status === 401) {
            console.log('Las credenciales de autenticación no se proporcionaron.');
          }
        });
    };
    $scope.loadData(0,1);

    $scope.pagingLoad = function() {
      var loaded = postLoaded.cargados+=1
      $scope.loadData(loaded,loaded+1);

    }
  }]);