/**
 * Created by hama on 2017/9/18.
 */
//一级回复表
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReplySchema = new Schema({

})
const Reply = mongoose.model('Reply',ReplySchema);
module.exports = Reply
