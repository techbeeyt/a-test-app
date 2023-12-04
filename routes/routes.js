var logic = require('../code');
var utils = require('../utils');
var path = require('path');

var appRouter = function(app) {
    // New code
    // Endpoint to save user demographic data
    app.post('/user', function(req, res) {
        console.log("Request received for user data");
        logic.saveUserData(req.body)
            .then(function(obj) {
                res.status(200).send({
                    "id": obj.id,
                    "order": obj.qOrder
                });
            })
            .catch(function(error) {
                res.status(500).send(error); // Send the error details or a custom message
                console.error(error); // It's good practice to log the error as well.
            });
    });

    //Endpoint to get a question by id
    app.post('/question', function(req, res) {
        console.log(req.body.set, req.body.id);
        data = logic.getQuestionBySetAndId(req.body.set, req.body.id);
        result = JSON.stringify(data);
        res.status(200).send(result);
    });

    // Endpoint to save avatar selection
    app.post('/avatar', function(req, res) {
        console.log("Request received for avatar selection");
        var userId = req.body.userId; // Assuming the userId is sent in the request
        var avatar = req.body.avatarSelection; // Assuming the avatar selection is sent in the request
        
        console.log(userId, avatar);
        
        logic.saveAvatarSelection(userId, avatar)
            .then(function(avatarId) {
                console.log(avatarId);
                logic.getVerificationCode(userId).then(function(code) {
                    console.log(code);
                    res.status(200).send("<h2 style='padding:20px; text-align:center;'> Thank you for your participation! <br> <br> Please use the following code to claim your reward. <br/><br/>Your code is<br/><p style='color:red;font-size:35px;'>" + code + "</p></h2>");
                })
            })
            .catch(function(error) {
                res.status(500).send({ "error": error });
                console.error("Error saving avatar selection:", error);
            });
    });

    app.post('/feedback', function(req, res) {
        console.log("Request received at feedback endpoint");
        var userAnswer = {};
        userAnswer.userId = req.body.userId;
        userAnswer.questionId = parseInt(req.body.questionId);
        userAnswer.questionSet = req.body.questionSet;
        userAnswer.initialOpinion = parseInt(req.body.initialOpinion);
        userAnswer.initialConfidence = parseInt(req.body.initialConfidence);
        userAnswer.initialFamiliarity = parseInt(req.body.initialFamiliarity);
        userAnswer.initialLike = parseInt(req.body.initialLike);
        userAnswer.initialComment = parseInt(req.body.initialComment);
        userAnswer.initialShare = parseInt(req.body.initialShare);
        userAnswer.initialReport = parseInt(req.body.initialReport);
        userAnswer.initialFactcheck = parseInt(req.body.initialFactcheck);

        return new Promise(function(resolve, reject) {
            logic.saveAnswer(userAnswer).then(function(id) {
                resolve(res.status(200).send(id));
            });
        });
    });

    //Endpoint to update answer
    app.post('/updateAnswer', function(req, res) {
        console.log("Request received at update answer");
        var userAnswer = {};

        userAnswer.userId = req.body.userId;
        userAnswer.questionId = parseInt(req.body.questionId);

        userAnswer.manipulationRadioOpinion = parseInt(req.body.manipulationRadioOpinion);
        userAnswer.newOpinion = parseInt(req.body.newOpinion);
        userAnswer.newConfidence = parseInt(req.body.newConfidence);

        userAnswer.newLike = parseInt(req.body.newLike);
        userAnswer.newComment = parseInt(req.body.newComment);
        userAnswer.newShare = parseInt(req.body.newShare);
        userAnswer.newReport = parseInt(req.body.newReport);
        userAnswer.newFactcheck = parseInt(req.body.newFactcheck);

        return new Promise(function(resolve, reject) {
            logic.updateAnswer(userAnswer).then(function(id) {
                resolve(res.status(200).send(id));
            });
        });
    });


    //Endpoint to get all the questions and answers
    app.get('/questions', function(req, res) {
        data = logic.getAllQuestions();
        result = JSON.stringify(data);
        res.status(200).send(result);
    });



    //Endpoint to get the big five questions
    app.post('/bigFiveQuestions', function(req, res) {
        var ethnicity = req.body.ethnicity;
        console.log(ethnicity);
        data = logic.getBigFiveQuestions(ethnicity);
        res.status(200).send(data);
    });

    //Endpoint to process the big five data
    app.post('/bigFiveData', function(req, res) {
        console.log("Request received at big five");
        console.log(req.body);
        const userId = req.body.userId
        logic.getVerificationCode(userId).then(function(code) {
            logic.processBigFive(req.body);
            console.log(code);
            return res.status(200).send({
                success: true,
                message: "big-five-answer-submitted"
            });
        }).catch(err => {
            return res.status(200).send({
                success: false,
                message: "You are not verified!!"
            })
        })

        
    });

    //Endpoint to save user chats
    app.post('/saveChats', function(req, res) {
        console.log("Request received at user chat");
        return new Promise(function(resolve, reject) {
            var userId = req.body.userId;
            var chat = req.body.chats;

            logic.saveUserChat(userId, chat).then(function(status) {
                resolve(res.status(200).send(status));
            });
        });
    });

    app.post('/chat', function(req, res) {
        console.log(req.body);
        res.status(200).send("Response from Quiz Bot");
    });

    app.post('/randomValues', function(req, res) {
        var isMajority = req.body.isMajority;
        var values = [];
        for (var i = 0; i < req.body.values.length; i++) {
            values.push(parseInt(req.body.values[i]))
        }
        console.log(values);
        var result = utils.randValues(isMajority, values)
        res.status(200).send(result);
    });

    //Endpoint to index
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    });

    //Endpoint to index
    app.get('/index.html', function(req, res) {
        res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    });

    //Endpoint to quiz.html
    app.get('/quiz.html', function(req, res) {
        res.sendFile(path.join(__dirname, '..', 'views', 'quiz.html'));
    });

    //Endpoint to big-five.html
    app.get('/big-five.html', function(req, res) {
        res.sendFile(path.join(__dirname, '..', 'views', 'big-five.html'));
    });

    //Endpoint to avatars.html
    app.get('/avatars.html', function(req, res) {
        res.sendFile(path.join(__dirname, '..', 'views', 'avatars.html'));
    });

};


module.exports = appRouter;