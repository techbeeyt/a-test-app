var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var answerSchema = new Schema({
    userId: String,
    questionId: Number,
    questionSet: String,

    initialOpinion: Number,
    initialConfidence: Number,
    initialFamiliarity: Number,
    initialLike: Number,
    initialComment: Number,
    initialShare: Number,
    initialReport: Number,
    initialFactcheck: Number,

    manipulationRadioOpinion: { type: Number, required: false },
    newOpinion: { type: Number, required: false },
    newConfidence: { type: Number, required: false },
    
    newLike: { type: Number, required: false },
    newComment: { type: Number, required: false },
    newShare: { type: Number, required: false },
    newReport: { type: Number, required: false },
    newFactcheck: { type: Number, required: false },

    submitTime: { type: Date, required: false, default: Date.now },
    editTime: { type: Date, required: false, default: Date.now }
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
