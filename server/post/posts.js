/**
 * Created by administrator on 15-6-26.
 */
Meteor.methods({
    /**
     * 新增话题
     * @param postAttributes
     * @returns {*}
     */
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
                  browses:[user._id],
                  comments:[],
                  praises:[]
                });
                  

                var postId = Posts.insert(post);
           console.log(postId);
                return  postId;

              },
    /**
     * 新增浏览数
     * @param id
     */
    
              'addBrowses': function (id) {
                  console.log(id);
                var data = Meteor.user()._id;
                console.log(data)


           var   browse =   Posts.findOne({'_id': id},{ fields: {browses:1,_id:0}});
             console.log(browse)
       
               Posts.update({'_id': id},{ $addToSet: { browses: data}})
    
    
                
              },

                /**
                 *  点赞数
                 * @param id
                 */
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
                  } ,
                /**
                 * 删除话题
                 * @param id
                 * @returns {*}
                 */
            'delsTopic': function (id) {
                  console.log(id);
                var data = Meteor.user()._id;
                console.log(data)
                 var   data =   Posts.remove({'_id': id});
                console.log(data);
                Comments.remove({'postId': id});
                return data ;

              }


})

