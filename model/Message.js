/**
 * Created by hama on 2017/9/18.
 */
//用户消息表
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const BaseModel = require('./base_model');
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
    //获取未读消息的数量
    getMessagesNoReadCount:(id,callback)=>{
        Message.count({'target_id':id,'has_read':false},callback)
    },
    //获取已读消息的数量
    getMessagesReadCount:(id,callback)=>{
        Message.count({'target_id':id,'has_read':true},callback)
    },
    //读取未读消息
    getUnReadMessages:(id,callback)=>{
        Message.find({'target_id':id,'has_read':false},null,{sort:'-create_time'}).populate('author_id').populate('target_id').populate('question_id').populate('reply_id').exec(callback);
    },
    //读取已读消息
    getReadMessages:(id,callback)=>{
        Message.find({'target_id':id,'has_read':true},null,{sort:'-create_time',limit:5}).populate('author_id').populate('target_id').populate('question_id').populate('reply_id').exec(callback);
    },
    //更新某条消息为已读
    updateMessage:(id,callback)=>{
        Message.update({'_id':id},{$set:{'has_read':true}}).exec(callback);
    },
    //更新某个用户的所有消息为已读
    updateAllMessage:(user_id,callback)=>{
        Message.update({'target_id':user_id},{$set:{'has_read':true}},{multi:true}).exec(callback);
    },
    //显示分页后的已读消息列表
    showMessagesPage:(user_id,startNum,limit,callback)=>{
        Message.find({'target_id':user_id,'has_read':true}).sort({'create_time':'-1'}).populate('author_id').populate('target_id').populate('question_id').skip(startNum).limit(limit).exec(callback)
    }
}
MessageSchema.plugin(BaseModel);
const Message = mongoose.model('Message',MessageSchema);
module.exports = Message
