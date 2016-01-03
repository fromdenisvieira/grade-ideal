(function() {

  'use strict';


  angular
      .module('ajusteMatricula.home', ['ui.router'])
      .config(config);


  function config($stateProvider, $urlRouterProvider) {

    var modulePath = 'app/modules/home/views/';

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: modulePath+'index.html',
        controller: 'HomeRetrieveCtrl',
        controllerAs: 'vm'
    });

  };

}());
