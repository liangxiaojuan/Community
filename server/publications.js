Meteor.publish("posts", function () {
  return Posts.find({}, {fields: {_id:1,title: 1, content: 1,author:1,submitted:1,userId:1}},{sort: -1});
  
});
Meteor.publish('comments', function() {
  return Comments.find({});
});

Meteor.publish('notifications', function() {
  return Notifications.find();
});