(function () {
    'use strict';
    angular.module('ajusteMatricula.results').controller('ResultsRetrieveCtrl', ResultsRetrieveCtrl);

    ResultsRetrieveCtrl.$inject = ['$scope', '$rootScope', '$location', 'APP_SETTINGS','localStorageService','$q','$timeout','$stateParams'];

    function ResultsRetrieveCtrl($scope, $rootScope, $location, APP_SETTINGS,localStorageService,$q,$timeout,$stateParams) {

        var vm = this;
        // vm.disciplines = SemesterGridPrepService;
        // vm.gridToPdf = gridToPdf;

        var gridId = $stateParams.gridId;

        getGrids().then(function(data){
           vm.grade = data[gridId];
           console.log("grade 1",vm.grade[1].horario[3]);
        }).catch(function(error){
                alert('erro');
        });

        vm.filteredGrid = function (tasks,tags) {

             return tasks.filter(function(task) {

                 for (var i in task.Tags) {
                     if (tags.indexOf(task.Tags[i]) != -1) {
                         return true;
                     }
                 }
                 return false;

             });

         };


        ///////////////////////////////////////////////////

        function getGrids(){
           var deferred = $q.defer();
           $timeout(function(){
             var data=localStorageService.get('Grades');
             deferred.resolve(data);
            },1000);
           return deferred.promise;
        }


        function gridToPdf() {

            var pdf = new jsPDF('p', 'pt', 'a4');

            var imgData = "data:image/png;base64,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";

            pdf.addImage(imgData, 'png', 170, 500, 300, 113);

            pdf.setFontSize(25);e
            pdf.text(160, 50, 'Instituto Federal de Alagoas');

            pdf.setFontSize(15);
            pdf.text(180, 70, 'Bacharelado em Sistemas de Informação');

            pdf.setFontSize(20);
            pdf.text(240, 120, 'MEU HORÁRIO');

            var specialElementHandlers = {
            	'#editor': function(element, renderer){
            		return true;
            	}
            }

            pdf.fromHTML($('#grid').get(0), 90, 160, {
            	'width': 170,
            	'elementHandlers': specialElementHandlers
            });
            pdf.save('meu-horario-bsi.pdf');

        }


    }
})();
