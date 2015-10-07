/**
 * Created by dxs on 2015-09-19.
 */


angular.module("index").controller("topicCommentCtrl", ['$scope','$stateParams', '$meteor','$state', '$ionicPopup',
    function ($scope,$stateParams,$meteor,$state,$ionicPopup) {
       /**
        *数据处理
        */      
                $scope.comment= $meteor.object(Comments, $stateParams._id).subscribe('comments');
                        console.log($scope.comment);
              

                   $scope.comments = $meteor.collection(function() {
                var Id =$stateParams._id ;
              var comments= Comments.find({'commentId':Id}, {
                    sort : {submitted:-1}
                  });
              return  comments;
              }).subscribe('comments');
                   console.log( $scope.comments)

         


       /**
        *新增评论
        */  

		      $scope.addComments= function (newcomment) {
		              console.log(newcomment);
		                if(!newcomment){
		             $ionicPopup.alert({
		                title: '错误',
		                template: '您输入的评论不能为空!'
		            });
		                    return;
		                }
		                   var comment = _.extend(newcomment, {
		                            commentId :$stateParams._id,
		                   
		                });
		             console.log(comment);
		                $meteor.call('addComments', comment).then(
		                    function (data) {
		                      /*      $state.go('topicComment',{_id:$stateParams._id})*/

		                     self.location.reload()
		                    },
		                    function (err) {
		                     
		                        console.log(err)
		                    }
		                )
		            }
    }
]);
