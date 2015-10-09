/**
 * Created by dxs on 2015-09-14.
 */


angular.module("index").controller("topicDetailsCtrl", ['$scope', '$stateParams', '$meteor', '$ionicPopup', '$ionicActionSheet', '$state', '$ionicLoading', '$timeout',
    function ($scope, $stateParams, $meteor, $ionicPopup, $ionicActionSheet, $state, $ionicLoading, $timeout) {


        /**
         *数据处理
         */
        var vm = $scope.vm = {};
        //根据$stateParams._id 查询的帖子
        $scope.post = $meteor.object(Posts, $stateParams._id).subscribe('posts');
        console.log($scope.post)
        if( Meteor.user()){
            vm.user = Meteor.user()._id;
        }
        // 根据$stateParams._id 查询的评论
        $scope.comments = $meteor.collection(function () {
            var Id = $stateParams._id;
            var comments = Comments.find({'postId': Id}, {
                sort: {submitted: -1}
            });
            return comments;
        });
        //默认把评论的评论遍历出来.
        vm.comments = [];
        for (var i = 0; i < $scope.comments.length; i++) {
            var com = $meteor.collection(function () {
                var Id = $scope.comments[i]._id;
                return Comments.find({'commentId': Id}, {
                    sort: {submitted: -1}
                });
            });

            var comment = {};
            comment.id = $scope.comments[i]._id;
            comment.author = $scope.comments[i].author;
            comment.submitted = $scope.comments[i].submitted;
            comment.content = $scope.comments[i].content;
            comment.comment = com;
            vm.comments.push(comment);
        }

        /**
         * 增加评论
         * @param newcomment
         */
        $scope.addComments = function (newcomment) {
            console.log(newcomment);
            if (!newcomment) {
                $ionicPopup.alert({
                    title: '错误',
                    template: '您输入的评论不能为空!'
                });
                return;
            }
            var comment = _.extend(newcomment, {
                postId: $stateParams._id,
                postTitle: $scope.post.title,
                user_id: $scope.post.userId,
                replyMan: $scope.post.author

            });
            console.log(comment);
            $meteor.call('addComments', comment).then(
                function (data) {
                    $ionicLoading.show({
                        template: '评论成功'
                    });
                    $state.go('topicComment', {_id: data})
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 800);
                },
                function (err) {

                    console.log(err)
                }
            )
        }

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
        }

        /**
         * 删除话题
         */
        $scope.delsTopic = function (id) {
            console.log('a');
            var confirmPopup = $ionicPopup.confirm({
                title: '确定删除这个话题吗?',
                scope: $scope,
                buttons: [
                    {text: '取消'},
                    {
                        text: '<b>确定</b>',
                        type: 'button-dark',
                        onTap: function (e) {
                            //这里操作确定后的
                            console.log(id);
                            $meteor.call('delsTopic', id).then(
                                function (data) {
                                    console.log(data);
                                    if (data == 1) {
                                        $state.go('topic')
                                    }
                                },
                                function (err) {

                                    console.log(err)
                                }
                            )
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
         * 删除评论
         */
        $scope.delcomment = function () {
            console.log('a');
            var confirmPopup = $ionicPopup.confirm({
                title: '确定删除这个评论吗?',
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
         * 点击发布评论
         */

        $scope.addcomment = function () {


            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.wifi">',
                title: '回复xxx', // 这里拿回复的人
                subTitle: '输入你的评论',
                scope: $scope,
                buttons: [
                    {text: '取消'},
                    {
                        text: '<b>发表</b>',
                        type: 'button-dark',
                        onTap: function (e) {
                            e.preventDefault();
                            //这里写对评论的操作,用ng-model来拿值
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });

        }
        /**
         * 点击发布评论
         */

        $scope.goComment = function (id) {

            console.log(id)
            $state.go('topicComment', {_id: id})

        }


    }
]);
