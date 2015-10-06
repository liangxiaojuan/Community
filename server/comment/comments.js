/**
 * Created by administrator 
 */
Meteor.methods({
    //新增帖子评论
    'addComments': function (commentAttributes) {
    
             check(Meteor.userId(), String);
                var user = Meteor.user();
                var comment = _.extend(commentAttributes, {
                  userId: user._id,
                  author: user.username,
                  submitted: new Date(),
                  praises:0
                });
                 console.log(comment);
                var commentId = Comments.insert(comment);
           console.log(commentId);
                return commentId  ;
              },
    
        'selectComments': function (id) {
    
                return Comments.find({'postId':id}, {
                    sort : {submitted:-1}
                  });  ;
              }
})

