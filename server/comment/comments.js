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
            praises: []
        });
        console.log(comment);
        var commentId = Comments.insert(comment);
        console.log(commentId);
        if (comment.user_id !== user._id) {

            var notification = {
                comId: commentId,
                postUserid: comment.user_id,
                author: user.username,
                submitted: new Date(),
                postTitle: comment.postTitle,
                content: comment.content,
                replyMan: comment.replyMan,
                read: false

            }
            console.log(notification)
            Notifications.insert(notification);
        }


        return commentId;
    },
    /**
     * 新增回复
     */
    'addReply': function (commentAttributes) {

        var user = Meteor.user();
        var comment = _.extend(commentAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            praises: []
        });
        console.log(comment);
        var data = Comments.insert(comment);
        var notification = {
            comId: comment.commentId,
            postUserid: comment.postUserid,
            author: user.username,
            submitted: new Date(),
            postTitle: comment.postTitle,
            content: comment.content,
            replyMan: comment.replyMan,
            read: false

        }
        console.log(notification)
        Notifications.insert(notification);


        return data;
    },

    /**
     *  评论点赞数
     * @param id
     */
    'upPraise': function (id) {
        console.log(id);
        var data = Meteor.user()._id;
        console.log(data)
        var browse = Comments.findOne({'_id': id, praises: data});
        console.log(browse)
        if (!browse) {
            Comments.update({'_id': id}, {$addToSet: {praises: data}})
        } else if (browse) {
            Comments.update({'_id': id}, {$pull: {praises: data}})
        }
    },
    /**
     * 删除评论
     * @param id
     * @returns {*}
     */
    'delsComment': function (id) {
        console.log(id);
        var data = Meteor.user()._id;
        console.log(data)
        var data = Comments.remove({'_id': id});
        console.log(data);
        Comments.remove({'commentsId': id});
        return data;

    },
    /**
     * 更改阅读状态
     * @param id
     * @returns {*}
     */
    'readNotification': function (id) {
        console.log(id);

        var data = Notifications.update({'_id': id}, {$set: {'read': true}});

        return data;

    }
})

