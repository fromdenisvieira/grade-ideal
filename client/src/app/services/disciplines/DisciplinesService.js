(function() {

	'use strict';

	angular
		.module('ajusteMatricula')
		.factory('DisciplinesService',DisciplinesService);

	DisciplinesService.$inject = ['$http', '$location','$q','APP_SETTINGS'];

	function DisciplinesService($http, $location,$q,APP_SETTINGS){

		var isPrimed = false;
	    var primePromise;

	    var service = {
	        listar: listar
	    };

	    return service;

		///////////////////////////

		function listar(sequencial) {

			var retorno = $q.defer();

			$http.get(APP_SETTINGS.API_URL+'/disciplinas').success(function(data) {
				retorno.resolve(data);
			})
			.error(function() {
				alert("Aconteceu algo ruim! Verifique sua conexão de internet");
			});

			return retorno.promise;
		}

		function getSelected() {

		}

		function watchDiscipline(){

		}


	}

}());
