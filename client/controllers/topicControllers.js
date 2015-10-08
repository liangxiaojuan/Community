/**
 * Created by dxs on 2015-09-14.
 */

angular.module("index").controller("topicCtrl", ['$scope', '$meteor', '$ionicModal', '$ionicPopup', '$ionicActionSheet', '$http', '$ionicLoading', '$timeout', '$state',
    function ($scope, $meteor, $ionicModal, $ionicPopup, $ionicActionSheet, $http, $ionicLoading, $timeout, $state) {

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
        $scope.notifications = $meteor.collection(function () {
            var Id = Meteor.user()._id;
            var notification = Notifications.find({'postUserid': Id, 'read': false}
            );
            return notification;
        })
        console.log($scope.notifications.length)

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


        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        /**
         * 打开模态框
         */
        $scope.openModal = function () {
            $scope.modal.show();
        };


        /**
         * 放弃编辑
         */
        $scope.closeModal = function () {

            var confirmPopup = $ionicPopup.confirm({
                title: '确定放弃编辑退出?',
                scope: $scope,
                buttons: [
                    {text: '取消'},
                    {
                        text: '<b>确定</b>',
                        type: 'button-dark',
                        onTap: function () {
                            $scope.modal.hide();
                        }
                    }
                ]
            });
            confirmPopup.then(function (res) {
                if (res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });

        };


        /**
         * 图片单个删除
         */
        $scope.showimgConfirm = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: '确定删除图片吗?',
                scope: $scope,
                buttons: [
                    {text: '取消'},
                    {
                        text: '<b>确定</b>',
                        type: 'button-dark',
                        onTap: function (e) {
                            //这里操作确定后的
                        }
                    }
                ]
            });
            confirmPopup.then(function (res) {
                if (res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        };
        /**
         * 上传图片按钮
         */
        $scope.showAction = function () {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {
                        text: '拍照',
                        onTap: function (e) {
                            //这里操作确定后的
                            hideSheet();
                        }
                    },
                    {
                        text: '相册',
                        onTap: function (e) {
                            //这里操作确定后的
                            hideSheet();
                        }
                    }
                ],
                cancelText: '取消',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    return true;
                }
            });


        };
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
        /**
         * 新增帖子
         */

        $scope.save = function (post) {
            console.log(post);
            if (!post) {
                $ionicPopup.alert({
                    title: '错误',
                    template: '您输入的话题内容不能为空!'
                });
                return;
            }

            if (!post.title) {
                $ionicPopup.alert({
                    title: '错误',
                    template: '您输入的标题内容不能为空!'
                });
                return;
            }
            if (!post.content) {
                $ionicPopup.alert({
                    title: '错误',
                    template: '您输入的文本内容不能为空!'
                });
                return;
            }

            $meteor.call('addPosts', post).then(
                function (data) {
                    $scope.modal.hide();
                    $state.go('topicDetails', {_id: data})
                    $ionicLoading.show({
                        template: '发帖成功！'
                    });
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 1000);
                },
                function (err) {

                    console.log(err)
                }
            )
        }

    }
]);
