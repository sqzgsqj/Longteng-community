/**
 * Created by hama on 2017/9/18.
 */
//问题表
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionSchema = new Schema({

})
const Question = mongoose.model('Question',QuestionSchema);
module.exports = Question
