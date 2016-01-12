(function() {

	'use strict';

	angular.module('ajusteMatricula')
	.factory('SemesterGridService', ['$http', '$location','$q','APP_SETTINGS', function($http, $location,$q,APP_SETTINGS) {

        var gerar = function (completedDisciplines) {

        	var retorno = $q.defer();

			var completedDisciplinesToJson = function (){

	    		return angular.toJson({"historico":completedDisciplines});
			};


			$http.post(APP_SETTINGS.API_URL+'/grades', completedDisciplinesToJson())
			.success(function(result) {

				retorno.resolve(result);
				console.log(result);
			})
			.error(function() {

				alert("Aconteceu algo ruim! Verifique sua conexão de internet");
			});


			return retorno.promise;

        }

        return {
            gerar: gerar
        };

	}]);


}());
