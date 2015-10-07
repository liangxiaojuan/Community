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
                  browses:[],
                  comments:[],
                  praises:[]
                });
                  

                var postId = Posts.insert(post);
           console.log(postId);
                return {
                  _id: postId
                };
              },
    
              'addBrowses': function (id) {
                  console.log(id);
                var data = Meteor.user()._id;
                console.log(data)


           var   browse =   Posts.findOne({'_id': id},{ fields: {browses:1,_id:0}});
             console.log(browse)
       
               Posts.update({'_id': id},{ $addToSet: { browses: data}})
    
    
                
              },


               'upPraises': function (id) {
                  console.log(id);
                var data = Meteor.user()._id;
                console.log(data)
           var   browse =   Posts.findOne({'_id': id,praises:data});
             console.log(browse)
             if (!browse) {
                      Posts.update({'_id': id},{ $addToSet: { praises: data}})
             }else  if (browse) {
                Posts.update({'_id': id},{$pull:{praises:data}})
             };
              }

})

