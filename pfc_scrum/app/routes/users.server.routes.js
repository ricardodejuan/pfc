/**
 * Created by J. Ricardo de Juan Cajide on 9/10/14.
 */
'use strict';

/**
 * Module dependencies.
 */


module.exports = function(app) {

    // User Routes
    var users = require('../../app/controllers/users');

    // Show users
    app.route('/users').get(users.requiresLogin, users.list);

    // Show specific user
    app.route('/users/:userId').get(users.requiresLogin, users.load);

    // Setting up the users profile api
    app.route('/users/me').get(users.me);
    app.route('/users').put(users.update);

    // Setting up the users password api
    app.route('/users/password').post(users.changePassword);
    app.route('/auth/forgot').post(users.forgot);
    app.route('/auth/reset/:token').get(users.validateResetToken);
    app.route('/auth/reset/:token').post(users.reset);

    // Setting up the users authentication api
    app.route('/auth/signup').post(users.signup);
    app.route('/auth/signin').post(users.signin);
    app.route('/auth/signout').get(users.signout);

    // Finish by binding the user middleware TODO review
    app.param('userId', users.userByID);
};