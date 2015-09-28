angular.module("myGlobal").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider){
            $locationProvider.html5Mode(true);

            $urlRouterProvider.otherwise("/topic");
        }]
);