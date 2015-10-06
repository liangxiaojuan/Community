/**
 * Created by dxs on 2015-09-19.
 */


angular.module("index").controller("topicCommentCtrl", ['$scope','$stateParams', '$meteor',
    function ($scope,$stateParams,$meteor) {
       /**
        *数据处理
        */      
                $scope.comment= $meteor.object(Comments, $stateParams._id).subscribe('comments');
                        console.log($scope.comment);
           




    }
]);
