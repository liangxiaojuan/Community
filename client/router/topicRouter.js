/**
 * Created by dxs on 2015-09-14.
 */
angular.module("index").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider){
            $locationProvider.html5Mode(true);

            $stateProvider


                .state('topic', {
                    url: '/topic',

                            templateUrl: 'client/views/topic.ng.html',
                            controller: 'topicCtrl'

                })
                .state('topicDetails', {
                    url: '/topic/Details/:_id',
                            templateUrl: 'client/views/topicDetails.ng.html',
                            controller: 'topicDetailsCtrl'

                })
                .state('topicReply', {
                    url: '/topic/Reply',
                    templateUrl: 'client/views/topicReply.ng.html',
                    controller: 'topicReplyCtrl'

                })
                .state('topicComment', {
                    url: '/topic/Comment',
                    templateUrl: 'client/views/topicComment.ng.html',
                    controller: 'topicCommentCtrl'

                })



        }]
);