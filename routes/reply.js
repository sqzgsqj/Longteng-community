/**
 * Created by hama on 2017/10/12.
 */
const validator = require('validator');
const Reply = require('../model/Reply');
const Question = require('../model/Question');
const at = require('../common/at');
exports.add = (req,res,next)=>{
    //文章的ID
    let question_id = req.params.question_id;
    //回复的内容
    let content = req.body.content;
    content = validator.trim(String(content));
    if(content === ''){
        return res.end('内容不能为空');
    }else{
        //存到Reply表里面去
        let newReply = new Reply();
        newReply.content = content;
        newReply.question_id = question_id;
        newReply.author = req.session.user._id;
        //1.第一个任务，是存入reply表
        newReply.save().then(reply=>{
            return reply;
        }).then(reply=>{
            //2.第二个任务，是将question表更新最后回复的信息
            Question.findOne({'_id':reply.question_id}).then(question=>{
                question.last_reply = reply._id;
                question.last_reply_author = reply.author;
                question.last_reply_time = new Date();
                question.comment_num += 1;
                question.save();
            })
            return reply;
        }).then(reply=>{
            //3.@某个人，要给这个人发送一个消息
            //不能@问题的作者
            Question.getQuestionById(reply.question_id,(err,question)=>{
                //得到作者的人名
                //console.log(question.author.name);
                let regex = new RegExp('@' + question.author.name + '\\b(?!\\])', 'g')
                let newContent = content.replace(regex,'');
                at.sendMessageToMentionUsers(newContent,reply.question_id,reply.author,reply._id,(err,msg)=>{
                    if(err){
                        return res.end(err);
                    }
                });
            })
        })
    }
}