Meteor.publish("posts", function () {
  console.log("woaini1");
  return Posts.find();
  
});
Meteor.publish('comments', function() {
  console.log("woaini2");
  return Comments.find({});
});

Meteor.publish('notifications', function() {
  console.log("woaini3");
  return Notifications.find();
});