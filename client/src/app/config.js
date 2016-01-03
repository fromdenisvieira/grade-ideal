(function () {
    angular.module('ajusteMatricula').constant('APP_SETTINGS', {
        "API_URL": "http://54.94.204.2:5000"
    });

    angular.module('ajusteMatricula').run(function ($rootScope, $location) {
        $rootScope.user = null;
        $rootScope.currentPath = $location.path();
        console.log($rootScope.currentPath);

    });
})();
