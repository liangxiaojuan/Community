/**
 * Created by dxs on 2015-09-14.
 */

angular.module("index").controller("topicCtrl", ['$scope', '$meteor',  '$ionicPopup', '$ionicActionSheet', '$http', '$ionicLoading', '$timeout', '$state',
    function ($scope, $meteor, $ionicPopup, $ionicActionSheet, $http, $ionicLoading, $timeout, $state) {

        /**
         * 数据处理
         * @type {{}}
         */
        var vm = $scope.vm = {};
        //订阅接收话题表
        $scope.posts = $meteor.collection(function () {

            return Posts.find({}, {
                sort: {submitted: -1}
            })
        })

        console.log($scope.posts);
        console.log($scope.posts[0]);

        //分页接收话题,默认4个`
        vm.posts = [];
        if ($scope.posts.length > 4) {
            var pag = 4;
        } else if ($scope.posts.length <= 4) {
            var pag = $scope.posts.length;
        }

        console.log(pag);
        for (var i = 0; i < pag; i++) {
            var postCom = $meteor.collection(function () {
                var Id = $scope.posts[i]._id;
                return Comments.find({'postId': Id});
            })
            console.log($scope.posts[i]._id);
            var post = {};
            post._id = $scope.posts[i]._id;
            post.author = $scope.posts[i].author;
            post.submitted = $scope.posts[i].submitted;
            post.title = $scope.posts[i].title;
            post.userId = $scope.posts[i].userId;
            post.browses = $scope.posts[i].browses;
            post.content = $scope.posts[i].content;
            post.praises = $scope.posts[i].praises;
            post.comments = postCom.length;
            vm.posts.push(post);

        }
        ;
        if(Meteor.user()){
            $scope.notifications = $meteor.collection(function () {
                var Id = Meteor.user()._id;
                var notification = Notifications.find({'postUserid': Id, 'read': false}
                );
                return notification;
            })
            console.log($scope.notifications.length)
        }


        /**
         * 无限滚动
         */
        $scope.loadMore = function () {
            console.log(pag);
            console.log($scope.posts.length);
            if (pag + 1 == $scope.posts.length) {
                $scope.noMoreItemsAvailable = true;
            }
            if (pag < $scope.posts.length) {
                var p = pag;

                var postCom = $meteor.collection(function () {
                    var Id = $scope.posts[p]._id;
                    return Comments.find({'postId': Id});
                }).subscribe('comments');

                var post = {};
                post._id = $scope.posts[p]._id;
                post.author = $scope.posts[p].author;
                post.submitted = $scope.posts[p].submitted;
                post.title = $scope.posts[p].title;
                post.userId = $scope.posts[p].userId;
                post.browses = $scope.posts[p].browses;
                post.content = $scope.posts[p].content;
                post.praises = $scope.posts[p].praises;
                post.comments = postCom.length;
                vm.posts.push(post);
                pag++;

                $scope.$broadcast('scroll.infiniteScrollComplete');

            }


        }
        /**
         * 下拉刷新
         */
        $scope.doRefresh = function () {
            self.location.reload();

        };
        $scope.$on('stateChangeSuccess', function () {
            $scope.loadMore();
        });

        /**
         * 等待事件
         */

        $scope.showLoading = function (id) {
            $ionicLoading.show({
                template: '加载中..'
            });
            console.log(id)
            $meteor.call('addBrowses', id).then(
                function (data) {
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 1000);
                },
                function (err) {

                    console.log(err)
                }
            )
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
        };
        /**
         * 增加点赞数，减点赞数
         */

        $scope.upPraises = function (id) {

            console.log(id)
            $meteor.call('upPraises', id).then(
                function (data) {
                },
                function (err) {

                    console.log(err)
                }
            )
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
        };


    }
]);
