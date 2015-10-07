/**
 * Created by dxs on 2015-09-17.
 */


angular.module("index").controller("topicReplyCtrl", ['$scope','$state', '$meteor',
    function ($scope,$state,$meteor) {
    /**
        *数据处理
        */      
      
            
                   $scope.notifications = $meteor.collection(function() {
                    var Id =  Meteor.user()._id;
              var notification= Notifications.find({'postUserid':Id}, {
                    sort : {submitted:-1}
                  });
              return  notification;
              }).subscribe('notifications');
                   console.log($scope.notifications)

         


        $scope.gocomment= function(commentId){
            $state.go('topicComment',{_id:commentId})
        }


    }
]);

