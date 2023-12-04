/*This file contains the utilities required for the logic on code.js*/

//Importing the questions
exports.questions = require('./db/questions');
exports.questionsTwo = require('./db/questionsTwo');

//Function to get question by questionNumber
exports.getQuestionByNumber = function(set, number) {
  var questions;
  if (set == "1"){
    questions = this.questions;
  } else{
    questions = this.questionsTwo;
  }

  for (var i = 0; i < questions.length; i++) {
    if (questions[i].questionNumber == number) {
      return (questions[i]);
    }
  }
};

//Returns the answer given the answer id
exports.getAnswerById = function(answers, id) {
  for (var i = 0; i < answers.length; i++) {
    if (answers[i].id == id) {
      return (answers[i]);
    }
  }
}

//Function to compare two arrays
exports.areArraysEqual = function(arr1, arr2) {
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) {
      return (false);
    }
  }
  return (true);
}

//Returns the manipulation check for each question
exports.getManipulationForQuestion = function(set, id) {
  var question = this.getQuestionByNumber(set, id);
  return (question.majority);
}
