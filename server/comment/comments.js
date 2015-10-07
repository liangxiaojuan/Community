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
                  if (comment.user_id !== user._id) {

                      var notification ={
                          comId:commentId,
                            postUserid:comment.user_id,
                           author: user.username,
                            submitted: new Date(),
                            postTitle:comment.postTitle,
                            content:comment.content,
                            read: false

                      }
                      console.log(notification)
                          Notifications.insert(notification);
                        }
              
       
                return commentId  ;
              },
    
        'selectComments': function (id) {
    
                return Comments.find({'postId':id}, {
                    sort : {submitted:-1}
                  });  ;
              }
})

