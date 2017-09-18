/**
 * Created by hama on 2017/9/18.
 */
//二级回复表
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new Schema({

})
const Comment = mongoose.model('Comment',CommentSchema);
module.exports = Comment
