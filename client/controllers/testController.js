/**
 * Created by administrator on 15-10-4.
 */
angular.module("test").controller("testCtrl", ['$scope', '$stateParams', '$meteor', '$rootScope',
    function ($scope, $stateParams, $meteor, $rootScope) {

        console.log("----------------------test-----------------");
        //window.location.href = 'http://am.xianro.com/getsignature';
        window.location.href = 'http://192.168.1.104:3000/getsignature';
    }
]);
