/**
 * Created by administrator on 15-6-26.
 */
Meteor.methods({
    //新增话题帖子
    'addPosts': function (postAttributes) {
    
             check(Meteor.userId(), String);
                check(postAttributes, {
                  title: String,
                  content: String
                });
                var user = Meteor.user();
                var post = _.extend(postAttributes, {
                  userId: user._id,
                  author: user.username,
                  submitted: new Date(),
               /*   browses:0,
                  comments:[],
                  praises:0*/
                });
                var postId = Posts.insert(post);
           console.log(postId);
                return {
                  _id: postId
                };
              }
    
    
})

