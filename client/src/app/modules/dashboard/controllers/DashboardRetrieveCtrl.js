(function () {
    'use strict';
    angular.module('ajusteMatricula.dashboard').controller('DashboardRetrieveCtrl', DashboardRetrieveCtrl);

    DashboardRetrieveCtrl.$inject = ['$scope', '$rootScope', '$location', 'APP_SETTINGS','DisciplinesService'];

    function DashboardRetrieveCtrl($scope, $rootScope, $location, APP_SETTINGS,DisciplinesService) {

        var vm = this;

        vm.disciplines = [];
        vm.selectedDisciplines = [];


        vm.checkall = checkAll;
        vm.getSelectedDisciplines = getSelectedDisciplines;

        activate();

        function activate() {
            return getDisciplines().then(function() {
                console.log('Activated Disciplines View');
            });
        }

        // vm.disciplines = DisciplinesPrepService.disciplinas;
        // console.log(vm.disciplines);
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

        function getSelectedDisciplines() {
                return vm.selectedDisciplines;
        }

        function checkAll(){
            vm.selectedDisciplines = vm.disciplines.map(function(item){ return item.id; });
            console.log(vm.selectedDisciplines);
        }
        function uncheckAll(){

        }

    }
})();
