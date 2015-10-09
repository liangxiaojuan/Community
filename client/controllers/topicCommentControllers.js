/**
 * Created by dxs on 2015-09-19.
 */


angular.module("index").controller("topicCommentCtrl", ['$scope', '$stateParams', '$meteor', '$state', '$ionicPopup', '$ionicLoading', '$timeout',
    function ($scope, $stateParams, $meteor, $state, $ionicPopup, $ionicLoading, $timeout) {
        /**
         *数据处理
         */
        var vm = $scope.vm = {};
        if( Meteor.user()){
            vm.user = Meteor.user()._id;
        }
        $scope.comment = $meteor.object(Comments, $stateParams._id);
        console.log($scope.comment);
        var postid = $scope.comment.postId
        $scope.comments = $meteor.collection(function () {
            var Id = $stateParams._id;
            var comments = Comments.find({'commentId': Id}, {
                sort: {submitted: -1}
            });
            return comments;
        });
        console.log($scope.comments)


        /**
         *新增评论
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

            if (vm.user == $scope.comment.userId) {
                $ionicPopup.alert({
                    title: '错误',
                    template: '您不能评论自己的评论!'
                });
                return;
            }
            if (vm.user == $scope.comment.user_id) {
                var comment = _.extend(newcomment, {
                    commentId: $stateParams._id,
                    replyMan: $scope.comment.author,
                    postTitle: $scope.comment.postTitle,
                    post_id: postid,
                    postUserid: $scope.comment.userId

                });
            }
            if (vm.user != $scope.comment.userId) {
                var comment = _.extend(newcomment, {
                    commentId: $stateParams._id,
                    post_id: postid,
                    postTitle: $scope.comment.postTitle,
                    postUserid: $scope.comment.userId
                });
            }


            console.log(comment);
            $meteor.call('addReply', comment).then(
                function (data) {
                    $ionicLoading.show({
                        template: '评论成功'
                    });
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 800);
                    /*      $state.go('topicComment',{_id:$stateParams._id})*/
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
            $meteor.call('upPraise', id).then(
                function (data) {
                },
                function (err) {

                    console.log(err)
                }
            )
        };
        /**
         * 删除评论
         */
        $scope.delsComment = function (id) {
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
                            console.log(id);
                            $meteor.call('delsComment', id).then(
                                function (data) {
                                    console.log(data);
                                    if (data == 1) {
                                        $ionicLoading.show({
                                            template: '删除成功'
                                        });
                                        $state.go('topicDetails', {_id: postid})
                                        $timeout(function () {
                                            $ionicLoading.hide();
                                        }, 800);
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
         * 点击回复评论
         */

        $scope.replyComment = function (name, userid) {
            if (vm.user != $scope.comment.userId) {

                return;
            }
            if (vm.user == userid) {

                return;
            }
            $scope.data = {}
            console.log(userid);
            console.log(name);
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.reply">',
                title: '回复', // 这里拿回复的人
                subTitle: name,
                scope: $scope,
                buttons: [
                    {text: '取消'},
                    {
                        text: '<b>回复</b>',
                        type: 'button-dark',
                        onTap: function (e) {
                            e.preventDefault();
                            //这里写对评论的操作,用ng-model来拿值
                            console.log($scope.data.reply);
                            if ($scope.data.reply) {
                                var comment = {
                                    commentId: $stateParams._id,
                                    replyMan: name,
                                    post_id: postid,
                                    postTitle: $scope.comment.postTitle,
                                    content: $scope.data.reply,
                                    postUserid: userid

                                };
                                console.log(comment);
                                $meteor.call('addReply', comment).then(
                                    function (data) {
                                        $ionicLoading.show({
                                            template: '回复成功'
                                        });
                                        myPopup.close();
                                        $timeout(function () {
                                            $ionicLoading.hide();
                                        }, 800);
                                        /*      $state.go('topicComment',{_id:$stateParams._id})*/
                                    },
                                    function (err) {

                                        console.log(err)
                                    }
                                )

                            }

                        }
                    }
                ]
            });
            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });

        }
    }
]);
