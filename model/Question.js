/**
 * Created by hama on 2017/9/18.
 */
//问题表
const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;
const BaseModel = require('./base_model');
const _ = require('lodash');
const setting = require('../setting');
const QuestionSchema = new Schema({
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    create_time:{
        type:Date,
        default:Date.now
    },
    update_time:{
        type:Date,
        default:Date.now
    },
    tags:[String],
    //点击量
    click_num:{
        type:Number,
        default:0
    },
    //回复量
    comment_num:{
        type:Number,
        default:0
    },
    //关注量
    follow_num:{
        type:Number,
        default:0
    },
    //作者
    author:{
        type:String,
        ref:'User'
    },
    //最后回复的帖子
    last_reply:{
        type:String,
        ref:'Reply'
    },
    last_reply_time:{
        type:Date,
        default:Date.now
    },
    //最后回复的人
    last_reply_author:{
        type:String,
        ref:'User'
    },
    //是否被删除
    deleted:{
        type:Boolean,
        default:false
    }
})
//创建一个虚拟的字段
QuestionSchema.virtual('categoryName').get(function(){
    let category = this.category;
    let pair = _.find(setting.categorys,function(item){
        return item[0] == category;
    })
    if(pair){
        return pair[1];
    }else{
        return '';
    }
})
QuestionSchema.statics = {
    //获取一个问题的相关信息
    getFullQuestion:(id,callback)=>{
        //暂时可以先不去查询last_reply这个信息
        Question.findOne({'_id':id,'deleted':false}).populate('author').populate('last_reply_author').exec(callback)
    }
}
QuestionSchema.plugin(BaseModel);
const Question = mongoose.model('Question',QuestionSchema);
module.exports = Question
