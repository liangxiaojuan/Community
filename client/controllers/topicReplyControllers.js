/**
 * Created by dxs on 2015-09-17.
 */


angular.module("index").controller("topicReplyCtrl", ['$scope','$state',
    function ($scope,$state) {

        $scope.gocomment= function(){
            $state.go('topicComment');

        }


    }
]);

angular.module('myGlobal')
    .directive('myFocus', function () {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                if (attrs.myFocus == "") {
                    attrs.myFocus = "focusElement";
                }
                scope.$watch(attrs.myFocus, function(value) {
                    if(value == attrs.id) {
                        element[0].focus();
                    }
                });
                element.on("blur", function() {
                    scope[attrs.myFocus] = "";
                    scope.$apply();
                })
            }
        };
    });