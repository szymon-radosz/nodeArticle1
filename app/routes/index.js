const meetRoutes = require('./meet_routes');
const userRoutes = require('./user_routes');
const takePartRoutes = require('./take_part_routes');
const commentRoutes = require('./comment_routes');

module.exports = function(app, db) {
  meetRoutes(app, db);
  userRoutes(app, db);
  takePartRoutes(app, db);
  commentRoutes(app, db);

};