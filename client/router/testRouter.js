/**
 * Created by administrator on 15-10-4.
 */
/**
 * Created by dxs on 2015-09-14.
 */
angular.module("test").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider){
            $locationProvider.html5Mode(true);
            $stateProvider
                .state('test', {
                    url: '/test',
                    templateUrl: 'client/views/test/test.ng.html',
                    controller: 'testCtrl'

                })
        }]
);