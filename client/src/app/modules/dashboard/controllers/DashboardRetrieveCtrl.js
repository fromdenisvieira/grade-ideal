(function () {
    'use strict';
    angular.module('ajusteMatricula.dashboard').controller('DashboardRetrieveCtrl', DashboardRetrieveCtrl);

    DashboardRetrieveCtrl.$inject = ['$scope', '$rootScope', '$location', 'APP_SETTINGS','DisciplinesService','SemesterGridService','localStorageService','filterFilter'];

    function DashboardRetrieveCtrl($scope, $rootScope, $location, APP_SETTINGS,DisciplinesService,SemesterGridService,localStorageService,filterFilter) {

        var vm = this;

        vm.disciplines = [];
        vm.selectedDisciplines = [];


        vm.checkall = checkAll;
        vm.getGrid = getGrid;

        activate();

        function activate() {
            return getDisciplines().then(function() {
                console.log('Activated Disciplines View');
            });
        }

        vm.checkSelected = function(){
            console.log(vm.selectedDisciplines);
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

        function getGrid() {
            return SemesterGridService.gerar(vm.selectedDisciplines).then(function(data){

                vm.disciplines = data.grades;
                console.log(vm.disciplines);
                return vm.disciplines;
            })
            .catch(function(error){
                    alert('erro');
            });
        }

        function checkAll(numPeriodo){
            console.log(numPeriodo);
            var filteredArray = filterFilter(vm.disciplines, {periodo:numPeriodo});
            var idsPeriodDisciplines = filteredArray.map(function(item){ return item.id; });

            var count = 0;
            // verificando se existe todas as disciplinas do periodo selecionadas
            // for(var i = idsForMark.length - 1; i >= 0; i--){
            //
            //     console.log(idsForMark[i]);
            //     if(angular.isArray(value)idsForMark[i] in vm.selectedDisciplines){
            //         console.log("Disciplina: "+idsForMark[i]+" já esta incluida");
            //         count++;
            //     }else{
            //         vm.selectedDisciplines.push(idsForMark[i])
            //     }
            // }

            var addAllToArray=true;
            var countToUncheckAll= 0;
            var checkRest = [];

            for(var x=0;x<vm.selectedDisciplines.length;x++){
                for (var i = 0; i < idsPeriodDisciplines.length; i++) {
                    if(idsPeriodDisciplines[i]===vm.selectedDisciplines[x]){
                        addAllToArray=false;
                        countToUncheckAll++;
                        console.log("value of disciplines incluidas: ",countToUncheckAll);
                    }
                    if(idsPeriodDisciplines[i]!==vm.selectedDisciplines[x]){
                        vm.selectedDisciplines.push(idsPeriodDisciplines[i]);
                    }
                }

            }

            // console.log("items para marcar : ",checkRest);

            if(countToUncheckAll === idsPeriodDisciplines.length){
                // remove todas as disciplinas do periodo
                for(var x=0;x<vm.selectedDisciplines.length;x++){
                    for (var i = 0; i < idsPeriodDisciplines.length; i++) {
                        if(idsPeriodDisciplines[i]===vm.selectedDisciplines[x]){
                            vm.selectedDisciplines.splice(x,1);
                        }
                    }
                }
            }
            //
            // if(checkRest !== [] && addAllToArray === false){
            //     for (var i = 0; i < checkRest.length-1; i++) {
            //         vm.selectedDisciplines.push(checkRest[i]);
            //     }
            // }

            if(addAllToArray){
                for (var i = 0; i < idsPeriodDisciplines.length; i++) {
                    vm.selectedDisciplines.push(idsPeriodDisciplines[i]);
                }
            }


            // if(count === idsPeriodDisciplines.length){
            //
            // }else if(count === 0 ){
            //
            // }else{
            //     for(var i = vm.selectedDisciplines.length - 1; i >= 0; i--){
            //         if(idsForMark[i] in vm.selectedDisciplines){
            //             vm.selectedDisciplines.splice(i,1);
            //         }else{
            //             vm.selectedDisciplines.push(idsForMark[i])
            //         }
            //     }
            // }


            // if(vm.selectedDisciplines.length !== filteredArray.length){
            //
            //
            //     vm.selectedDisciplines.push(listForMark);
            // }
            // else {
            //     for(var i = $scope.items.length - 1; i >= 0; i--){
            //         if($scope.items[i].name == 'ted'){
            //             $scope.items.splice(i,1);
            //         }
            //     }
            //     console.log("diferente");
            //     // vm.selectedDisciplines = [];
            // }

            // console.log("disciplinas selecionadas:",vm.selectedDisciplines);

            console.log("disciplinas do periodo",idsPeriodDisciplines);
            console.log("disciplinas selecionadas",vm.selectedDisciplines);
        }

    }
})();
