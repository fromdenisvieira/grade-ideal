(function(){
        angular.module('ajusteMatricula', [

        // App Components

        // App Modules Dependencies
        'ajusteMatricula.dashboard',
        'ajusteMatricula.home',
        'ajusteMatricula.results',

        // External Dependencies
        'ui.router'
    ])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

          $urlRouterProvider.otherwise("/");

    }]);
})();
