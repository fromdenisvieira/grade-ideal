(function() {

  'use strict';

  angular
      .module('ajusteMatricula.results', ['ui.router','LocalStorageModule'])
      .config(config);


  function config($stateProvider, $urlRouterProvider) {

    var modulePath = 'app/modules/results/views/';

    $stateProvider
      .state('results', {
        url: '/results',
        templateUrl: modulePath+'index.html',
        controller: 'ResultsRetrieveCtrl',
        controllerAs: 'vm'
        // resolve: {
        //     SemesterGridPrepService: SemesterGridPrepService
        // }
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
