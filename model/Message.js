/**
 * Created by hama on 2017/9/18.
 */
//用户消息表
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const MessageSchema = new Schema({
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    type:{
        type:String,
        require:true
    },
    target_id:{
        type:String,
        require:true,
        ref:'User' //关联user表
    },
    author_id:{
        type:String,
        requrie:true,
        ref:'User' //关联user表
    },
    question_id:{
        type:String,
        require:true,
        ref:'Question' //关联question表
    },
    reply_id:{
        type:String,
        require:true,
        ref:'Reply' //关联reply表
    },
    has_read:{
        type:Boolean,
        default:false
    },
    create_time:{
        type:Date,
        default:Date.now
    }
})
MessageSchema.statics = {
    //获取消息的数量
    getMessagesCount:(id,callback)=>{
        Message.count({'target_id':id,'has_read':false},callback)
    },
    //读取未读消息
    getUnReadMessages:(id,callback)=>{
        Message.find({'target_id':id,'has_read':false},null,{sort:'-create_time'}).populate('author_id').populate('target_id').populate('question_id').exec(callback);
    },
    //读取已读消息
    getReadMessages:(id,callback)=>{
        Message.find({'target_id':id,'has_read':true},null,{sort:'-create_time',limit:20}).populate('author_id').populate('target_id').populate('question_id').exec(callback);
    }
}
const Message = mongoose.model('Message',MessageSchema);
module.exports = Message
