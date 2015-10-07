Meteor.publish("posts", function (options) {
 check(options, {
    sort: Object,
    limit: Number
  });
  return Posts.find({}, options);
  
});
Meteor.publish('comments', function() {
  return Comments.find({});
});

Meteor.publish('notifications', function() {
  return Notifications.find();
});