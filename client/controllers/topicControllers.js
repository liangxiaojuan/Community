/**
 * Created by dxs on 2015-09-14.
 */

angular.module("index").controller("topicCtrl", ['$scope','$ionicModal','$ionicPopup','$ionicActionSheet','$http','$ionicLoading','$timeout',
    function ($scope , $ionicModal,$ionicPopup,$ionicActionSheet,$http,$ionicLoading,$timeout) {


        $scope.items = [1,2,3,4,5,6,7,8,9,10];

        /**
         * 无限滚动
         */
        $scope.loadMore = function() {
            $http.get('/more-items').success(function(items) {
                $scope.items.push( $scope.items.length+1);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
        /**
         * 下拉刷新
         */
        $scope.doRefresh = function () {
            $http.get('/new-items')
                .success(function(newItems) {

                    $scope.items.push( $scope.items.length+1);
                })
                .finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
        $scope.$on('stateChangeSuccess', function() {
            $scope.loadMore();
        });


        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        /**
         * 打开模态框
         */
        $scope.openModal = function() {
            $scope.modal.show();
        };


        /**
         * 放弃编辑
         */
        $scope.closeModal = function() {

            var confirmPopup = $ionicPopup.confirm({
                title: '确定放弃编辑退出?',
                scope: $scope,
                buttons: [
                    { text: '取消' },
                    {
                        text: '<b>确定</b>',
                        type: 'button-dark',
                        onTap: function() {
                            $scope.modal.hide();
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
         * 图片单个删除
         */
        $scope.showimgConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: '确定删除图片吗?',
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
         * 上传图片按钮
         */
        $scope.showAction = function() {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '拍照',
                        onTap: function(e) {
                            //这里操作确定后的
                            hideSheet();
                        }},
                    { text: '相册' ,
                        onTap: function(e) {
                            //这里操作确定后的
                            hideSheet();
                        }}
                ],
                cancelText: '取消',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    return true;
                }
            });



        };
        /**
         * 等待事件
         */

        $scope.showLoading = function() {
            $ionicLoading.show({
                template: '加载中..'
            });
            $timeout(function () {
                $ionicLoading.hide();
            }, 2000);
        };


    }
]);
