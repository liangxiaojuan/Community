/**
 * Created by dxs on 2015-09-14.
 */


angular.module("index").controller("topicDetailsCtrl", ['$scope','$ionicPopup','$ionicActionSheet', '$stateParams', '$meteor',
    function ($scope,$ionicPopup,$ionicActionSheet, $stateParams, $meteor) {


        /**
        *数据处理
        */
                $scope.post= $meteor.object(Posts, $stateParams._id).subscribe('posts');
                        console.log($stateParams._id);
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
            $scope.delsTopic  =  function() {
                console.log('a');
                var confirmPopup = $ionicPopup.confirm({
                    title: '确定删除这个话题吗?',
                    scope: $scope,
                    buttons: [
                        { text: '取消' },
                        {
                            text: '<b>确定</b>',
                            type: 'button-dark',
                            onTap: function(e) {
                                //这里操作确定后的
                            }
                        }
                    ]
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        console.log('You are sure');
                    } else {
                        console.log('You are not sure');
                    }
                });
            };
        /**
         * 删除评论
         */
        $scope.delcomment  =  function() {
                console.log('a');
                var confirmPopup = $ionicPopup.confirm({
                    title: '确定删除这个评论吗?',
                    scope: $scope,
                    buttons: [
                        { text: '取消' },
                        {
                            text: '<b>确定</b>',
                            type: 'button-dark',
                            onTap: function(e) {
                                //这里操作确定后的
                            }
                        }
                    ]
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        console.log('You are sure');
                    } else {
                        console.log('You are not sure');
                    }
                });
            };

        /**
         * 点击发布评论
         */

        $scope.addcomment = function(){


            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.wifi">',
                title: '回复xxx', // 这里拿回复的人
                subTitle: '输入你的评论',
                scope: $scope,
                buttons: [
                    { text: '取消' },
                    {
                        text: '<b>发表</b>',
                        type: 'button-dark',
                        onTap: function(e) {
                                e.preventDefault();
                            //这里写对评论的操作,用ng-model来拿值

                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });

        }



    }
]);
