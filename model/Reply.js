/**
 * Created by hama on 2017/9/18.
 */
//一级回复表
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require('./base_model');
const shortid = require('shortid');
const ReplySchema = new Schema({
    //留言的ID
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    //留言的内容
    content:{
        type:String,
        require:true
    },
    //留言的人
    author:{
        type:String,
        ref:'User'
    },
    //留言的时间
    create_time:{
        type:Date,
        default:Date.now
    },
    //二级回复的ID
    reply_id:{
        type:String
    },
    //对应的问题
    question_id:{
        type:String,
        ref:'Question'
    },
    //喜欢该留言的人的数组
    likes:{
        type:[String],
        ref:'User'
    },
    //二级回复的数量
    comment_num:{
        type:Number,
        default:0
    }
})
ReplySchema.plugin(BaseModel);
const Reply = mongoose.model('Reply',ReplySchema);
module.exports = Reply
