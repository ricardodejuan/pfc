/**
 * Created by J. Ricardo de Juan Cajide on 10/7/14.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * A Validation function for properties
 */
var validateProperty = function(property) {
    return (property.length < 17);
};

var PhaseSchema = new Schema({
    phaseName: {
        type: String,
        required: true,
        trim: true,
        validate: [validateProperty, 'Phase Title must be between 0 and 16 characters']
    },
    sprint: {
        sprintId: {
            type: Schema.Types.ObjectId,
            ref: 'Sprint',
            required: true
        },
        order: {
            type: Number,
            required: true
        }
    }
});

var Phase = mongoose.model('Phase', PhaseSchema);
