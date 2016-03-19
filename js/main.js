(function (angular) {
    "use strict";

    angular.module(
        'arnold',
        [
            '720kb.background',
            'ui.router',
            'simplecolorpicker'
        ]
    )
        .config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
            function ($stateProvider, $locationProvider, $urlRouterProvider) {

                // use url without hash
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
                });

                $stateProvider
                    .state('home', {
                        url: "/",
                        controller: 'HomeController',
                        controllerAs: 'vm'
                    })
                ;

                $urlRouterProvider.otherwise('/404');

            }
        ])
    ;


})(angular);
