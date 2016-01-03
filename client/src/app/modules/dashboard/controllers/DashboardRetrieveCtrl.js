(function () {
    'use strict';
    angular.module('ajusteMatricula.dashboard').controller('DashboardRetrieveCtrl', DashboardRetrieveCtrl);

    DashboardRetrieveCtrl.$inject = ['$scope', '$rootScope', '$location', 'APP_SETTINGS','DisciplinesService'];

    function DashboardRetrieveCtrl($scope, $rootScope, $location, APP_SETTINGS,DisciplinesService) {

        var vm = this;

        // vm.disciplines = DisciplinesPrepService.disciplinas;
        // console.log(vm.disciplines);

        vm.players = [
          {name: 'Gene', team: 'alpha'},
          {name: 'George', team: 'beta'},
          {name: 'Steve', team: 'gamma'},
          {name: 'Paula', team: 'beta'},
          {name: 'Scruath', team: 'gamma'}
        ];

        // Other Option for call service when access route

        vm.disciplines = [];

        activate();

        function activate() {
            return getDisciplines().then(function() {
                console.log('Activated Disciplines View');
            });
        }

        //////////////////////////////////////////////////////////

       function getDisciplines(){
            return DisciplinesService.listar().then(function(data){
                vm.disciplines = data.disciplinas;
                console.log(vm.disciplines);
                return vm.disciplines;
            },
            function(){
                alert('erro');
            });
        }

    }
})();
