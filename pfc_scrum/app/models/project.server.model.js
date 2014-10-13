/**
 * Created by J. Ricardo de Juan Cajide on 9/17/14.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');
var _ = require('lodash');
var ObjectId = mongoose.Types.ObjectId;


/**
 * A Validation function for properties
 */
var validateProperty = function(property) {
    return (property.length < 17);
};

var ProjectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
        validate: [validateProperty, 'Project Name must be between 0 and 16 characters']
    },
    descriptionName: {
        type: String,
        default: '',
        trim: true
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    users: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        role: [{
            type: String,
            enum: ['SCRUM_MASTER', 'PRODUCT_OWNER', 'TEAM', 'STAKEHOLDER']
        }],
        admin: {
            type: Boolean
        },
        _id: false
    }],
    burnDownChart: {
        burnDownChartName: {
            type: String,
            required: true,
            trim: true,
            default: 'Burndown Chart'
        },
        workingDays: {
            type: Number
        },
        estimatePoints: {
            type: Number
        },
        remainingPoints: {
            type: Number
        }
    },
    productBackLog: {
        risks: [{
            type: String,
            trim: true
        }]
    }
});

ProjectSchema.methods = {

    addUsers: function (users, callback) {
        var _this = this;
        var usersToGo = users.length;

        _.forEach(users, function (user) {
            var index = _.findIndex(_this.users, { 'userId': new ObjectId(user.userId) });
            if (index === -1) {
                _this.users.addToSet (user);
                if (--usersToGo === 0) {
                    _this.save(callback);
                }
            } else {
                callback(new Error('User is already joined'));
            }
        });
    },

    deleteUser: function (userId, callback) {
        var _this = this;

        var index = _.findIndex(_this.users, { userId: userId });
        if (~index) {
            _this.users.splice(index, 1);
            _this.save(callback);
        } else {
            callback(new Error('UserId does not match'));
        }
    }

};

var Project = mongoose.model('Project', ProjectSchema);