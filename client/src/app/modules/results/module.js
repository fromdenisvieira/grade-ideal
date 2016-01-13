(function() {

  'use strict';

  angular
      .module('ajusteMatricula.results', ['ui.router','LocalStorageModule'])
      .config(config);


  function config($stateProvider, $urlRouterProvider) {

    var modulePath = 'app/modules/results/views/';

    $stateProvider
      .state('results', {
        url: '/results/:gridId',
        templateUrl: modulePath+'index.html',
        controller: 'ResultsRetrieveCtrl',
        controllerAs: 'vm'
    });

  }

  function SemesterGridPrepService(SemesterGridService){
    //   return SemesterGridService.gerar('completedDisciplines').then(function(data){
    //       console.log(data);
    //       vm.disciplines = data;
    //       return vm.disciplines;
    //   })
    //   .catch(function(error){
    //
    //           alert('erro');
    //   });
  }

}());
