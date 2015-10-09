/**
 * Created by dxs on 2015-10-09.
 */

angular.module("index").controller("addTopicCtrl", ['$scope', '$meteor', '$ionicPopup', '$ionicActionSheet', '$ionicLoading', '$timeout', '$state',
    function ($scope, $meteor,  $ionicPopup, $ionicActionSheet, $ionicLoading, $timeout, $state) {


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
                            $state.go('topic')
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
