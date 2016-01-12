(function() {

    'use strict';

    angular
        .module('ajusteMatricula.dashboard', ['ui.router','angular.filter','checklist-model','LocalStorageModule'])
        .config(config);


    function config($stateProvider, $urlRouterProvider) {

        var modulePath = 'app/modules/dashboard/views/';

        $stateProvider
          .state('dashboard', {
            url: '/dashboard',
            templateUrl: modulePath+'index.html',
            controller: 'DashboardRetrieveCtrl',
            controllerAs: 'vm'
        });
    }

    // function DisciplinesPrepService(DisciplinesService) {
    //     return DisciplinesService.listar().then(function(data){
    //         return data;
    //     })
    // ,
    // resolve: {
    //     DisciplinesPrepService: DisciplinesPrepService
    // }
    //     .catch(function(error) {
    //        // Interpret error
    //        // Cope w/ timeout? retry? try alternate service?
    //        // Re-reject with appropriate error for a user to see
    //     });
    // }

}());
