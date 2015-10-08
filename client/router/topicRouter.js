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
                            controller: 'topicCtrl',
                         resolve: {
                          'subscribe': [
                            '$meteor', function($meteor) {
                              return $meteor.subscribe('posts'),$meteor.subscribe('comments'),$meteor.subscribe('notifications');
                            }
                          ]
                        }

                })
                .state('topicDetails', {
                    url: '/topic/Details/:_id',
                            templateUrl: 'client/views/topicDetails.ng.html',
                            controller: 'topicDetailsCtrl',
                              resolve: {
                                  'subscribe': [
                                    '$meteor', function($meteor) {
                                      return $meteor.subscribe('comments');
                                    }
                                  ]
                                }

                })
                .state('topicReply', {
                    url: '/topic/Reply',
                    templateUrl: 'client/views/topicReply.ng.html',
                    controller: 'topicReplyCtrl',
                         resolve: {
                                  'subscribe': [
                                    '$meteor', function($meteor) {
                                      return $meteor.subscribe('notifications');
                                    }
                                  ]
                                }


                })
                .state('topicComment', {
                    url: '/topic/Comment/:_id',
                    templateUrl: 'client/views/topicComment.ng.html',
                    controller: 'topicCommentCtrl',
                          resolve: {
                                  'subscribe': [
                                    '$meteor', function($meteor) {
                                      return $meteor.subscribe('comments');
                                    }
                                  ]
                                }

                })



        }]
);