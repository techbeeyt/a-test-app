//Import the mongoose module
var mongoose = require('mongoose');
// Add mongodb database uri here
// var mongoDB = 'mongodb://localhost:27017/data';
var mongoDB = 'mongodb+srv://m0nst3r:m0nst3r@cluster0.luynrqo.mongodb.net/newcsedb?retryWrites=true&w=majority';



mongoose.connect(mongoDB, {
    useNewUrlParser: true, // Use the new URL parser
    useUnifiedTopology: true, // Use the new server discovery and monitoring engine
    useCreateIndex: true, // Use createIndex() instead of ensureIndex() for index creation
    useFindAndModify: false // Use findOneAndUpdate() without deprecation warning
});

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

// Bind to the 'error' event to get a connection error notification
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Bind to the 'connected' event to get a notification of successful connection
db.on('connected', function() {
    console.log('Mongoose connected to ' + mongoDB);
});

//Importing schemas
var Result = require('./schemas/result');
var User = require('./schemas/user');
var Answer = require('./schemas/answer');
var Avatar = require('./schemas/avatar');
var BigFiveRaw = require('./schemas/bigFiveRaw');
var Chat = require('./schemas/chat');
var bigFiveQuestions = require('./bigFiveQuestions');
var bigFiveQuestions2 = require('./bigFiveQuestions2'); // new for Indian

//Function to save the saw big five results to the database
exports.saveBigFiveRaw = function(userId, results) {
    var result = new BigFiveRaw({
        userId: userId,
        allAnswers: results
    });

    result.save(function(err) {
        if (err) throw err;
        console.log('Big five raw answers saved successfully!');
    });
};

//Function to save the big five results to the database
exports.saveBigFiveResults = function(userId, results) {
    var result = new Result({
        userId: userId,
        Extraversion: results.Extraversion,
        Agreeableness: results.Agreeableness,
        Conscientiousness: results.Conscientiousness,
        Neuroticism: results.Neuroticism,
        Openness: results.Openness,
        Conformity: results.Conformity,
        Identity: results.Identity
    });

    result.save(function(err) {
        if (err) throw err;
        console.log('Results saved successfully!');
    });
};

//Function to save user details
exports.saveUser = function(user) {
    return new Promise(function(resolve, reject) {
        var newUser = new User({
            gender: user.gender,
            genderSpecified: user.genderSpecified,
            age: user.age,
            education: user.education,
            educationSpecified: user.educationSpecified,
            country: user.country,
            countrySpecified: user.countrySpecified,
            ethnicity: user.ethnicity,
            ethnicitySpecified: user.ethnicitySpecified,
            socialmedia: user.socialmedia,
            questionSet: user.questionSet,
            qOrder: user.qOrder
        });

        // new code 
        //         newUser.save(function(err, savedUser) {
        //             if (err) {
        //                 console.error("Error saving user:", err);
        //                 reject(err); // Reject the promise if there is an error
        //             } else {
        //                 resolve(savedUser._id.toString()); // Resolve the promise with the new user's ID
        //             }
        //         });
        //     });
        // };




        newUser.save(function(err, newUser) {
            if (err) reject(err);
            resolve(newUser._id.toString());
        });
    });
};

//Function to save an answer
exports.saveAnswer = function(answer) {
    return new Promise(function(resolve, reject) {
        var newAnswer = new Answer({
            userId: answer.userId,
            questionId: answer.questionId,
            questionSet: answer.questionSet,
            initialOpinion: answer.initialOpinion,
            initialConfidence: answer.initialConfidence,
            initialFamiliarity: answer.initialFamiliarity,
            initialLike: answer.initialLike,
            initialComment: answer.initialComment,
            initialShare: answer.initialShare,
            initialReport: answer.initialReport,
            initialFactcheck: answer.initialFactcheck,

        });

        newAnswer.save(function(err, newAnswer) {
            if (err) reject(err);
            resolve(newAnswer._id.toString());
        });
    });
};

//Function to update an answer
exports.updateAnswer = function(answer) {
    var query = {
        userId: answer.userId,
        questionId: answer.questionId
    };
    var newData = {
        manipulationRadioOpinion: answer.manipulationRadioOpinion,
        newOpinion: answer.newOpinion,
        newConfidence: answer.newConfidence,

        newLike: answer.newLike,
        newComment: answer.newComment,
        newShare: answer.newShare,
        newReport: answer.newReport,
        newFactcheck: answer.newFactcheck,
        editTime: Date.now()
    };

    return new Promise(function(resolve, reject) {
        Answer.findOneAndUpdate(query, newData, {
            upsert: true
        }, function(err, newAnswer) {
            if (err) reject(err);
            resolve(newAnswer._id.toString());
        });
    });
};

//Function to get the big five questions
// exports.getBigFiveQuestions = function() {
//     return (bigFiveQuestions);
// };

// Updated Function to get the big five questions based on ethnicity (new code)

exports.getBigFiveQuestions = function(ethnicity) {
    console.log(ethnicity)
        // Check the ethnicity and return the appropriate questions
    if (ethnicity == 'indian') {
        return bigFiveQuestions2; // Return the Indian questions
    } else {
        // Default to American questions if not Indian or not specified
        return bigFiveQuestions; // Return the American questions
    }
};
// end here

// Function to save avatar selection
exports.saveAvatarSelection = function(userId, selectedAvatar) {
    return new Promise(function(resolve, reject) {
        var newAvatar = new Avatar({
            userId: userId,
            selectedAvatar: selectedAvatar
        });

        newAvatar.save(function(err, savedAvatar) {
            if (err) {
                console.error("Error saving avatar selection:", err);
                reject(err);
            } else {
                resolve(savedAvatar._id.toString());
            }
        });
    });
};

//Function to get answers of a given user
exports.getAllAnswersByUser = function(userId) {
    return new Promise(function(resolve, reject) {
        Answer.find({
            userId: userId
        }, function(err, docs) {
            resolve(docs);
        });
    });
};

//Function to add code to the user
exports.addCodeToUser = function(userId, code) {
    var query = {
        _id: mongoose.Types.ObjectId(userId)
    };
    var newData = {
        code: code
    };

    return new Promise(function(resolve, reject) {
        User.findOneAndUpdate(query, newData, {
            upsert: true
        }, function(err, newAnswer) {
            if (err) reject(err);
            resolve(newAnswer._id.toString());
        });
    });
};

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));