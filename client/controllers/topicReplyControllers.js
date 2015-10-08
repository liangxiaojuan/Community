/**
 * Created by dxs on 2015-09-17.
 */


angular.module("index").controller("topicReplyCtrl", ['$scope','$state', '$meteor',
    function ($scope,$state,$meteor) {
    /**
        *数据处理
        */      
      
            //接收的消息
          $scope.notifications = $meteor.collection(function() {
                    var Id =  Meteor.user()._id;
              var notification= Notifications.find({'postUserid':Id,'read':false}, {
                    sort : {submitted:-1}
                  });
              return  notification;
              }).subscribe('notifications');
                   console.log($scope.notifications)


        /**
         * 去次消息的评论处
         * @param commentId
         */
        $scope.gocomment= function(commentId,noId){
            console.log(noId);
            $meteor.call('readNotification', noId).then(
                function (data) {
                    console.log(data);
                    /*      $state.go('topicComment',{_id:$stateParams._id})*/
                },
                function (err) {

                    console.log(err)
                }
            )
            $state.go('topicComment',{_id:commentId})
        }


    }
]);

